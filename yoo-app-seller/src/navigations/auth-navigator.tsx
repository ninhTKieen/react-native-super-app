import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '@/screens/auth/screens/login';
import RegisterScreen from '@/screens/auth/screens/register';
import VerifiCodeScreen from '@/screens/auth/screens/verifi-code.screen';
import ForgetPasswordScreen from '@/screens/auth/screens/forget-password.screen';
import LicenseScreen from '@/screens/auth/screens/license.screen';
import SelectAccountScreen from '@/screens/auth/screens/select-account.screen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  SelectAccountScreen: undefined;
  VerifiCodeScreen: {
    userId: number;
    email?: string;
  };
  ForgetPasswordScreen: undefined;
  LicenseScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = ({
  initialRoute,
}: {
  initialRoute: keyof RootStackParamList;
}): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRoute}>
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen
        name={'SelectAccountScreen'}
        component={SelectAccountScreen}
      />
      <Stack.Screen name={'Register'} component={RegisterScreen} />
      <Stack.Screen name={'VerifiCodeScreen'} component={VerifiCodeScreen} />
      <Stack.Screen
        name={'ForgetPasswordScreen'}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name={'LicenseScreen'} component={LicenseScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
