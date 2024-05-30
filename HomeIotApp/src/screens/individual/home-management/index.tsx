import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeManagementRouteStackParamList } from '@src/configs/routes/individual/home-management.route';
import React from 'react';

import CreateHomeScreen from './create-home.screen';
import HomeMemberScreen from './home-member.screen';
import HomeSettingsScreen from './home-settings.screen';
import MainHomeManagementScreen from './main.screen';
import RoomManagementScreen from './room-management.screen';
import UpdateHomeScreen from './update-home.screen';

const HomeManagementStack =
  createNativeStackNavigator<HomeManagementRouteStackParamList>();

const HomeManagementNavigator = (): JSX.Element => {
  return (
    <HomeManagementStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainHomeManagement"
    >
      <HomeManagementStack.Screen
        name="MainHomeManagement"
        component={MainHomeManagementScreen}
      />
      <HomeManagementStack.Screen
        name="CreateHome"
        component={CreateHomeScreen}
      />
      <HomeManagementStack.Screen
        name="HomeSettings"
        component={HomeSettingsScreen}
      />
      <HomeManagementStack.Screen
        name="RoomManagement"
        component={RoomManagementScreen}
      />
      <HomeManagementStack.Screen
        name="HomeMember"
        component={HomeMemberScreen}
      />
      <HomeManagementStack.Screen
        name="UpdateHome"
        component={UpdateHomeScreen}
      />
    </HomeManagementStack.Navigator>
  );
};

export default HomeManagementNavigator;
