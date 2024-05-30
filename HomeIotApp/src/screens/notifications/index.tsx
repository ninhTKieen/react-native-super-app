import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { MessageCenterRouteStackParamList } from '@src/configs/routes/individual/individual.route';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWindowDimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';

import AlarmNotificationsTab from './components/alarm-notifications.tab';
import HomeNotificationsTab from './components/home-notifications.tab';

const Tab = createMaterialTopTabNavigator<MessageCenterRouteStackParamList>();

const TabLabel = ({
  focused,
  children,
}: {
  focused: boolean;
  color: string;
  children: string;
}) => {
  const { t } = useTranslation();

  const { width } = useWindowDimensions();

  const title = () => {
    switch (children) {
      case 'AlarmMessage':
        return t(i18nKeys.notification.alarm);
      case 'HomeMessage':
        return t(i18nKeys.notification.home);
      default:
        return '';
    }
  };
  return (
    <Text
      style={{
        color: focused ? colors.primary : colors.grey2,
        fontSize: 14,
        fontWeight: focused ? '700' : '400',
        textAlign: 'center',
        paddingHorizontal: 10,
        width: width * 0.5,
      }}
    >
      {title()}
    </Text>
  );
};

const NotificationsScreen = () => {
  const { t } = useTranslation();

  return (
    <MainLayout title={t(i18nKeys.notification.title)}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: colors.primary,
            },
            tabBarStyle: {
              borderBottomWidth: 0.3,
              borderColor: '#ced4da',
              backgroundColor: 'white',
            },
            tabBarItemStyle: {
              width: 'auto',
            },
            tabBarPressColor: 'transparent',
            tabBarLabel: TabLabel,
          }}
        >
          <Tab.Screen name="AlarmMessage" component={AlarmNotificationsTab} />
          <Tab.Screen name="HomeMessage" component={HomeNotificationsTab} />
        </Tab.Navigator>
      </GestureHandlerRootView>
    </MainLayout>
  );
};

export default NotificationsScreen;
