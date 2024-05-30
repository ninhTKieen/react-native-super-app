import { NavigationProp, useNavigation } from '@react-navigation/native';
import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { MainRouteStackParamList } from '@src/configs/routes/main.route';
import {
  ENotificationGroupType,
  ENotificationStatus,
  ENotificationType,
  INotification,
} from '@src/features/notifications/notification.model';
import notificationService from '@src/features/notifications/notification.service';
import { useAuth } from '@src/hooks/use-auth.hook';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { useNotifContent } from '@src/hooks/use-notif-content.hook';
import { formatDateFromNow } from '@src/utils/date.util';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  ImageBackground,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { Surface, Text } from 'react-native-paper';

const HomeNotificationsTab = () => {
  const { height } = useWindowDimensions();

  const navigation =
    useNavigation<NavigationProp<MainRouteStackParamList, 'Notifications'>>();
  const { authQuery } = useAuth();
  const { t } = useTranslation();

  const homeMessagesQuery = useInfiniteQuery({
    queryKey: ['alarm/messages'],
    queryFn: ({ pageParam }) =>
      notificationService.getNotifications({
        groupType: ENotificationGroupType.ALARM,
        skip: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }

      return allPages.length * 10;
    },
  });

  const getPaginatedData = () => {
    const data: INotification[] = [];

    homeMessagesQuery.data?.pages.forEach((page) => {
      data.push(...page);
    });

    return data;
  };

  const markNotifAsRead = useMutation({
    mutationFn: (notificationId: number) =>
      notificationService.markAsRead(notificationId),
    onSuccess: () => {
      homeMessagesQuery.refetch();
    },
    onError: () => {},
  });

  const { NotifContents } = useNotifContent();
  const { DeviceNames } = useDeviceName();

  const getNotificationParam = (item: INotification) => {
    switch (item.type) {
      case ENotificationType.MESSAGE_DEVICE_ADD:
        return {
          deviceName:
            DeviceNames[item.data.deviceName as keyof typeof DeviceNames],
        };
      case ENotificationType.MESSAGE_DEVICE_REMOVE:
        return {
          deviceName:
            DeviceNames[item.data.deviceName as keyof typeof DeviceNames],
        };
      case ENotificationType.MESSAGE_DEVICE_UPDATE:
        return {
          deviceName:
            DeviceNames[item.data.deviceName as keyof typeof DeviceNames],
        };
      case ENotificationType.MESSAGE_ESTATE_MEMBER_ADD:
        return {
          memberName: item.data.memberName,
        };
      case ENotificationType.MESSAGE_ESTATE_MEMBER_INVITE:
        return {
          memberName: item.data.memberName,
        };
      case ENotificationType.MESSAGE_ESTATE_MEMBER_REMOVE:
        return {
          memberName: item.data.memberName,
        };
      case ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER:
        return {
          memberName: item.data.memberName,
        };
      case ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER:
        return {
          memberName: item.data.memberName,
        };
      default:
        return {};
    }
  };

  const handleOnPress = useCallback(
    (item: INotification) => {
      markNotifAsRead.mutate(item.id);
      switch (item.type) {
        case ENotificationType.MESSAGE_DEVICE_ADD:
        case ENotificationType.MESSAGE_DEVICE_REMOVE:
        case ENotificationType.MESSAGE_DEVICE_UPDATE:
          navigation.navigate('Home');
          break;
        case ENotificationType.MESSAGE_ESTATE_MEMBER_ADD:
        case ENotificationType.MESSAGE_ESTATE_MEMBER_INVITE:
        case ENotificationType.MESSAGE_ESTATE_MEMBER_REMOVE:
        case ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MANAGER:
        case ENotificationType.MESSAGE_ESTATE_MEMBER_UPDATE_ROLE_MEMBER:
          navigation.navigate('Individual', {
            screen: 'HomeManagement',
            params: {
              screen: 'MainHomeManagement',
              params: {
                userId: authQuery.data?.id as number,
              },
            },
          });
          break;
      }
    },
    [authQuery.data?.id, markNotifAsRead, navigation],
  );

  return (
    <ImageBackground
      source={require('@src/assets/home-iot/background.jpeg')}
      style={styles.container}
    >
      <FlatList
        data={getPaginatedData()}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={homeMessagesQuery.isRefetching}
            onRefresh={() => homeMessagesQuery.refetch()}
          />
        }
        onEndReached={() => homeMessagesQuery.fetchNextPage()}
        renderItem={({ item }) => {
          const i18nParams = getNotificationParam(item);
          const NotifIcon =
            NotifContents[`${item.type}` as keyof typeof NotifContents]?.icon;

          return (
            <Pressable onPress={() => handleOnPress(item)}>
              <Surface
                style={[
                  styles.item,
                  {
                    backgroundColor:
                      item.status === ENotificationStatus.UNREAD
                        ? colors.grey7
                        : colors.white,
                  },
                ]}
              >
                <View>
                  {NotifIcon && (
                    <NotifIcon color={colors.primary} width={30} height={30} />
                  )}
                </View>
                <View style={{ width: '88%' }}>
                  <Text variant="titleMedium" style={{ fontWeight: '600' }}>
                    {item.type &&
                      NotifContents[
                        `${item.type}` as keyof typeof NotifContents
                      ]?.title}
                  </Text>
                  <Text
                    variant="titleSmall"
                    style={{ fontWeight: '500' }}
                    numberOfLines={2}
                  >
                    {formatDateFromNow(item.createdAt)} | {item.data.estateName}
                  </Text>
                  <Text variant="titleSmall" numberOfLines={3}>
                    {item.type &&
                      (NotifContents[
                        `${item.type}` as keyof typeof NotifContents
                      ]?.message(i18nParams) as any)}
                  </Text>
                </View>
              </Surface>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              height: height * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconGeneral
              type="MaterialIcons"
              name="notification-important"
              size={56}
              color={'#ced4da'}
            />
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#adb5bd' }}>
              {t(i18nKeys.notification.empty)}
            </Text>
          </View>
        }
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  item: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeNotificationsTab;
