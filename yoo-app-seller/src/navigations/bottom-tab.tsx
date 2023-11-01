/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  AnimatedTabBarNavigator,
  DotSize,
  TabElementDisplayOptions,
} from 'react-native-animated-nav-tab-bar';

import PartnerStoreStack from '@/screens/store';
import ProfileStackNavigator from '@/screens/profile';
import {shadowConstants} from '@/configs/shadowStyles';
import {useTranslation} from 'react-i18next';
import {MainBottomTabParamList} from '@/routes';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import OrderStack from '@/screens/order';
import HomeIcon from '../assets/bottom-tabs/icons/Home.svg';
import HomeOutlineIcon from '../assets/bottom-tabs/icons/Home_outline.svg';
import OrderIcon from '../assets/bottom-tabs/icons/order.svg';
import OrderOutlineIcon from '../assets/bottom-tabs/icons/order_outline.svg';
import MessageIcon from '../assets/bottom-tabs/icons/Message.svg';
import MessageOutlineIcon from '../assets/bottom-tabs/icons/Message_outline.svg';
import UserIcon from '../assets/bottom-tabs/icons/User.svg';
import UserOutlineIcon from '../assets/bottom-tabs/icons/User_outline.svg';
import ChatStack from '@/screens/chat';

const Tabs = AnimatedTabBarNavigator<MainBottomTabParamList>();

const BottomTabNavigator = () => {
  const {t} = useTranslation();

  return (
    <Tabs.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#223322',
        activeBackgroundColor: '#73a5c6',
        tabStyle: {
          ...shadowConstants[4],
          alignItems: 'center',
        },
        labelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          color: 'white',
        },
      }}
      appearance={{
        shadow: true,
        whenActiveShow: TabElementDisplayOptions.BOTH,
        dotSize: DotSize.DEFAULT,
        dotCornerRadius: 50,
      }}>
      <Tabs.Screen
        name={'Home'}
        component={PartnerStoreStack}
        options={{
          tabBarIcon: ({focused}: any) =>
            focused ? <HomeIcon /> : <HomeOutlineIcon />,
          tabBarLabel: t(i18nKeys.bottom_tab.store),
        }}
      />

      <Tabs.Screen
        name={'Order'}
        component={OrderStack}
        options={{
          tabBarIcon: ({focused}: any) =>
            focused ? <OrderIcon /> : <OrderOutlineIcon />,
          tabBarLabel: t(i18nKeys.bottom_tab.order),
        }}
      />

      <Tabs.Screen
        component={ChatStack}
        name={'PartnerStoreChatStack'}
        options={{
          tabBarIcon: ({focused}: any) =>
            focused ? <MessageIcon /> : <MessageOutlineIcon />,
          tabBarLabel: t(i18nKeys.bottom_tab.chat),
        }}
      />

      <Tabs.Screen
        name={'Individual'}
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: ({focused}: any) =>
            focused ? <UserIcon /> : <UserOutlineIcon />,
          tabBarLabel: t(i18nKeys.bottom_tab.individual),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabNavigator;
