import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthRouteStackParamList } from '@src/configs/routes/auth.route';
import { useAppStore } from '@src/features/app/app.store';
import { useAuth } from '@src/hooks/use-auth.hook';
import LoginScreen from '@src/screens/auth/login.screen';
import RegisterScreen from '@src/screens/auth/register.screen';
import React, { useEffect } from 'react';

const Stack = createNativeStackNavigator<AuthRouteStackParamList>();

const AuthNavigator = (): JSX.Element => {
  const { authQuery } = useAuth();
  const { setLoading } = useAppStore();

  useEffect(() => {
    if (authQuery.isLoading) {
      setLoading(true);
    }
  }, [authQuery.isLoading, setLoading]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
