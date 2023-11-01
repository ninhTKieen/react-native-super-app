import React, {useCallback, useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {useAuth} from '@/hooks/useAuth';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import authServices from '@/features/auth/auth.services';
import {
  authActions,
  selectAccounts,
  selectedEncryptedAccessToken,
} from '@/features/auth/auth.slice';
import AuthNavigator from './auth-navigator';
import BottomTabNavigator from './bottom-tab';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as signalR from '@microsoft/signalr';
import {setConnection} from '@/features/chat/chat.slice';
import {useTranslation} from 'react-i18next';
import {requestLocationPermission} from '@/utils/function.util';
import messaging from '@react-native-firebase/messaging';
import {Linking, Platform} from 'react-native';
import notifee, {
  AndroidImportance,
  EventType,
  Event as NotifeeEvent,
} from '@notifee/react-native';
import {APP_SCHEME, linking, screenUrls} from '@/configs/linking';
import {UserAction} from '@/features/notify/notify.model';
import {
  setCurrentStore,
  selectCurrentStore,
} from '@/features/store/store.slice';
import httpUtil from '@/utils/http.util';

const MainNavigator = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const {i18n} = useTranslation();
  const {currentUser, isAuth} = useAuth();

  const encryptedAccessToken = useAppSelector(selectedEncryptedAccessToken);
  const currentProvider = useAppSelector(selectCurrentStore);
  const currentProviderRef = useRef(currentProvider);
  const {language} = useAppSelector(state => state.setting);
  const accounts = useAppSelector(selectAccounts);

  React.useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const getMeMutation = useMutation(
    async () => await authServices.getUserInfo(),
    {
      onSuccess: data => {
        dispatch(authActions.getMeSuccess(data));
      },
      onError: () => {
        dispatch(authActions.getMeFailed());
      },
    },
  );

  const onStateChange = () => {
    (!isAuth || !currentUser) && encryptedAccessToken && getMeMutation.mutate();
  };

  const handleChangeProvider = useCallback(
    (message: any) => {
      const providerId = message.data?.provider_id;
      if (
        providerId !== null &&
        providerId !== '' &&
        currentProviderRef.current !== providerId
      ) {
        const providerList = queryClient.getQueryData(['providers']);

        const provider = (providerList as Array<any>)?.find((item: any) => {
          return item.id === Number(providerId);
        });
        dispatch(setCurrentStore(provider));
      }
      queryClient.refetchQueries(['orders']);
      queryClient.refetchQueries(['notify']);
      let orderRoute = APP_SCHEME;
      if (message?.data?.click_action === UserAction.CREATE_ORDER_SUCCESS) {
        console.log('[NAVIGATE TO ORDER LIST]');
        orderRoute = APP_SCHEME + screenUrls.order.list.pending;
      } else if (
        message?.data?.click_action === UserAction.REQ_CANCEL ||
        message?.data?.click_action === UserAction.CANCEL
      ) {
        console.log('[NAVIGATE TO CANCEL ORDER LIST]');
        orderRoute = APP_SCHEME + screenUrls.order.list.cancel.getAll;
      } else if (
        message?.data?.click_action === UserAction.SHIPPER_COMPLETED ||
        message?.data?.click_action === UserAction.SHIPPING_ORDER
      ) {
        console.log('[NAVIGATE TO SHIPPING ORDER LIST]');
        orderRoute = APP_SCHEME + screenUrls.order.list.shipping;
      } else {
        console.log('[NAVIGATE TO ORDER LIST]');
        orderRoute = APP_SCHEME + 'order';
      }
      Linking.openURL(orderRoute);
      orderRoute = APP_SCHEME;
    },
    [dispatch, queryClient],
  );

  const onMessageReceived = useCallback(
    async (message: any) => {
      console.log('[MESSAGE_RECEIVED]', message);
      const channelId = await notifee.createChannel({
        id: 'YooNotify',
        name: 'Yoo Channel',
        importance: AndroidImportance.HIGH,
      });

      // For IOS
      await notifee.requestPermission();
      if (Platform.OS === 'android') {
        await notifee.displayNotification({
          title: message.notification.title,
          body: message.notification.body,
          android: {
            channelId,
            pressAction: {
              id: 'YooNotify',
            },
            importance: AndroidImportance.HIGH,
          },
          data: message.data?.action ? {action: message.data.action} : {},
        });
      }

      notifee.onBackgroundEvent(async ({type}: NotifeeEvent) => {
        if (type === EventType.PRESS) {
          handleChangeProvider(message);
        }
      });

      notifee.onForegroundEvent(async ({type}: NotifeeEvent) => {
        if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
          handleChangeProvider(message);
        } else if (type === EventType.DISMISSED) {
        }
      });
    },
    [handleChangeProvider],
  );

  const handleNotification = useCallback(async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('[Device FCM TOKEN]', token);

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      if (remoteMessage) {
        handleChangeProvider(remoteMessage);
      }
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleChangeProvider(remoteMessage);
        }
      });

    // handle notification when app is in foreground
    messaging().onMessage(onMessageReceived);

    // handle notification when app is in background
    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, [handleChangeProvider, onMessageReceived]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    if (encryptedAccessToken && encryptedAccessToken !== '') {
      const hubConnection = new signalR.HubConnectionBuilder()
        .withAutomaticReconnect()
        .withUrl(
          httpUtil.getCurrentUrlHost() +
            '/messager?enc_auth_token=' +
            encodeURIComponent(encryptedAccessToken),
        )
        .build();
      hubConnection
        .start()
        .then(() => {
          console.log('[START_CONNECT_HUBCONNECTION]');
        })
        .catch((err: any) => {
          console.log('[ERROR_START_CONNECT_SIGNALR]', err);
        });
      hubConnection.onclose((e: any) => {
        if (e) {
          console.log('Chat connection closed with error: ', e);
        } else {
          console.log('Chat disconnected');
        }

        hubConnection.start().then(() => {});
      });

      dispatch(setConnection(hubConnection));
    }
  }, [dispatch, encryptedAccessToken]);

  useEffect(() => {
    requestLocationPermission();
  });

  useEffect(() => {
    handleNotification();
  }, [handleNotification]);

  return (
    <SafeAreaView style={{flex: 1}} edges={['top']}>
      <NavigationContainer linking={linking} onStateChange={onStateChange}>
        {!isAuth ? (
          accounts.length > 0 ? (
            <AuthNavigator initialRoute={'SelectAccountScreen'} />
          ) : (
            <AuthNavigator initialRoute={'Login'} />
          )
        ) : (
          <BottomTabNavigator />
        )}
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default MainNavigator;
