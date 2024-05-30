import notifee, {
  AndroidImportance,
  EventType,
  Event as NotifeeEvent,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingModal from '@src/components/loading-modal';
import { linking } from '@src/configs/constant/linking';
import { useAppStore } from '@src/features/app/app.store';
import socketService from '@src/features/socket/socket.service';
import { useAuth } from '@src/hooks/use-auth.hook';
import { requestPermission } from '@src/utils/common.util';
import { useQueryClient } from '@tanstack/react-query';
import React, { useCallback, useEffect } from 'react';
import { Platform, SafeAreaView } from 'react-native';

import AuthNavigator from './auth-navigator';
import MainNavigator from './main-navigator';

const RootStack = createStackNavigator();

const AppNavigator = (): JSX.Element => {
  const queryClient = useQueryClient();
  const { isAuth, currentUser } = useAuth();
  const { isLoading } = useAppStore();

  const onStateChange = () => {
    (!isAuth || !!currentUser) &&
      queryClient.refetchQueries({
        queryKey: ['auth/getUserInfo'],
      });
  };

  const onMessageReceived = useCallback(
    async (message: FirebaseMessagingTypes.RemoteMessage) => {
      console.log('message', message);
      const channelId = await notifee.createChannel({
        id: 'YooHomeNotify',
        name: 'YooHomeIoT',
        importance: AndroidImportance.HIGH,
      });

      // request permission
      await notifee.requestPermission();
      if (Platform.OS === 'android') {
        await notifee.displayNotification({
          title: message?.notification?.title,
          body: message?.notification?.body,
          android: {
            channelId,
            pressAction: {
              id: 'YooNotify',
            },
            importance: AndroidImportance.HIGH,
          },
          data: message.data?.action ? { action: message.data.action } : {},
        });
      }

      notifee.onBackgroundEvent(async ({ type }: NotifeeEvent) => {
        if (type === EventType.PRESS) {
          //handle press event
        }
      });

      notifee.onForegroundEvent(async ({ type }: NotifeeEvent) => {
        if (type === EventType.PRESS || type === EventType.ACTION_PRESS) {
          //handle press event
        } else if (type === EventType.DISMISSED) {
          //handle dismiss event
        }
      });
    },
    [],
  );

  const handleNotification = useCallback(async () => {
    messaging().onMessage(onMessageReceived);

    messaging().setBackgroundMessageHandler(onMessageReceived);
  }, [onMessageReceived]);

  useEffect(() => {
    if (isAuth) {
      socketService.start();
    }
  }, [isAuth]);

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    handleNotification();
  }, [handleNotification]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal isVisible={isLoading} />
      <NavigationContainer linking={linking} onStateChange={onStateChange}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isAuth ? (
            <RootStack.Screen name="Main" component={MainNavigator} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default AppNavigator;
