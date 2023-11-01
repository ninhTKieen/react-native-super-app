import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdvertisementStackParamList} from '@/routes/marketing.route';
import AdsListScreen from './ads-list.screen';
import CreateAdScreen from './create-ads.screen';

const Stack = createNativeStackNavigator<AdvertisementStackParamList>();

type Props = {};

const AdvertisementStack = (_: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="AdvertisementListScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="AdvertisementListScreen" component={AdsListScreen} />
      <Stack.Screen
        name="CreateAdvertisementScreen"
        component={CreateAdScreen}
      />
    </Stack.Navigator>
  );
};

export default AdvertisementStack;
