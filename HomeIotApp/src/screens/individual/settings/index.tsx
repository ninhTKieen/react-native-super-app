import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingRouteStackParamList } from '@src/configs/routes/settings/setting.route';
import React from 'react';

import MainSettingScreen from './main-setting.screen';

const SettingsStack = createNativeStackNavigator<SettingRouteStackParamList>();

const SettingsNavigator = (): JSX.Element => {
  return (
    <SettingsStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainSetting"
    >
      <SettingsStack.Screen name="MainSetting" component={MainSettingScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
