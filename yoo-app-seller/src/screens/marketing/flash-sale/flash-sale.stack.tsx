import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FlashSaleStackParamList} from '@/routes/marketing.route';
import FlashSaleListScreen from './flash-sale-list.screen';

const Stack = createNativeStackNavigator<FlashSaleStackParamList>();

type Props = {};

const FlashSaleStack = (_: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="FlashSaleListScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="FlashSaleListScreen"
        component={FlashSaleListScreen}
      />
    </Stack.Navigator>
  );
};

export default FlashSaleStack;
