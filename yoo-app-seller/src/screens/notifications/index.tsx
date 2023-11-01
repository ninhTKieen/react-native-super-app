import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListNotificationScreen from './list-notification.screen';
import {NotificationStackParamList} from '@/routes/notification.route';

const Stack = createNativeStackNavigator<NotificationStackParamList>();

const NotificationStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={'ListNotificationScreen'}
        component={ListNotificationScreen}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
