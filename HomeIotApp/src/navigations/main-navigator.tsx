import { useAppState } from '@react-native-community/hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountTabIcon from '@src/assets/home-iot/common/account-tab-icon.svg';
import AccountTabOutlineIcon from '@src/assets/home-iot/common/account-tab-outline-icon.svg';
import HomeTabIcon from '@src/assets/home-iot/common/home-tab-icon.svg';
import HomeTabOutlineIcon from '@src/assets/home-iot/common/home-tab-outline-icon.svg';
import NotifTabIcon from '@src/assets/home-iot/common/notif-tab-icon.svg';
import NotifTabOutlineIcon from '@src/assets/home-iot/common/notif-tab-outline-icon.svg';
import SceneTabIcon from '@src/assets/home-iot/common/scene-tab-icon.svg';
import SceneTabOutlineIcon from '@src/assets/home-iot/common/scene-tab-outline-icon.svg';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { MainRouteStackParamList } from '@src/configs/routes/main.route';
import deviceService from '@src/features/devices/device.service';
import { useDeviceStore } from '@src/features/devices/device.store';
import socketService from '@src/features/socket/socket.service';
import { useAuth } from '@src/hooks/use-auth.hook';
import HomeStack from '@src/screens/home';
import IndividualNavigator from '@src/screens/individual';
import NotificationsScreen from '@src/screens/notifications';
import SceneNavigator from '@src/screens/scenes';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native';

const Tabs = createBottomTabNavigator<MainRouteStackParamList>();

const MainNavigator = (): JSX.Element => {
  const { t } = useTranslation();

  const currentAppState = useAppState();
  const { isAuth } = useAuth();
  const { setProfile } = useDeviceStore();

  useEffect(() => {
    if (currentAppState === 'inactive') {
      socketService.disconnect();
    }
  }, [currentAppState]);

  useQuery({
    queryKey: ['devices/profiles'],
    queryFn: () => {
      const getDeviceProfiles = async () => {
        try {
          const response = await deviceService.getProfiles();
          setProfile(response);
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      };

      return getDeviceProfiles();
    },
    enabled: isAuth,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <SafeAreaView className="flex-1">
      <Tabs.Navigator
        screenOptions={{
          headerShown: false,
          // tabBarStyle: {
          //   paddingTop: 7,
          //   borderTopLeftRadius: 24,
          //   borderTopRightRadius: 24,
          //   borderLeftWidth: 0.2,
          //   borderRightWidth: 0.2,
          //   bottom: 0,
          //   overflow: 'hidden',
          // },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <HomeTabIcon width={28} height={28} />
              ) : (
                <HomeTabOutlineIcon width={28} height={28} />
              ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: `${t(i18nKeys.home.title)}`,
            tabBarItemStyle: {},
          }}
          component={HomeStack}
        />
        <Tabs.Screen
          name="Scenes"
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <SceneTabIcon width={28} height={28} />
              ) : (
                <SceneTabOutlineIcon width={28} height={28} />
              ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: `${t(i18nKeys.scene.title)}`,
          }}
          component={SceneNavigator}
        />
        <Tabs.Screen
          name="Notifications"
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <NotifTabIcon width={28} height={28} />
              ) : (
                <NotifTabOutlineIcon width={28} height={28} />
              ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: `${t(i18nKeys.notification.title)}`,
          }}
          component={NotificationsScreen}
        />
        <Tabs.Screen
          name="Individual"
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AccountTabIcon width={28} height={28} />
              ) : (
                <AccountTabOutlineIcon width={28} height={28} />
              ),
            tabBarActiveTintColor: colors.primary,
            tabBarLabel: `${t(i18nKeys.common.individual)}`,
          }}
          component={IndividualNavigator}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
};

export default MainNavigator;
