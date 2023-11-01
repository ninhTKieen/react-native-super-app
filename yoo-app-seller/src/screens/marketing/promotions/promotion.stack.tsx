import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PromotionListScreen from './promotion-list.screen';
import {PromotionStackParamList} from '@/routes/marketing.route';

const Stack = createNativeStackNavigator<PromotionStackParamList>();

type Props = {};

const PromotionStack = (_: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="PromotionListScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="PromotionListScreen"
        component={PromotionListScreen}
      />
    </Stack.Navigator>
  );
};

export default PromotionStack;
