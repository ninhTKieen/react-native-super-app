import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RatingScreen from './rating.screen';
import {RatingStackParamList} from '@/routes/rating.route';

const Stack = createNativeStackNavigator<RatingStackParamList>();

const RatingStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="RatingScreen" component={RatingScreen} />
    </Stack.Navigator>
  );
};

export default RatingStackNavigator;
