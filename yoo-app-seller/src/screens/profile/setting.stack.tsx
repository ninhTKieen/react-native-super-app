import React from 'react';
import {SettingStackParamList} from '@/routes/profile.route';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangePasswordScreen from './change-password.screen';
import SecurityScreen from './security-screen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SecurityScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
    </Stack.Navigator>
  );
};

export default SettingStackNavigator;
