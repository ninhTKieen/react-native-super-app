import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IndividualRouteStackParamList } from '@src/configs/routes/individual/individual.route';
import React from 'react';

import HomeManagementNavigator from './home-management';
import MainIndividualScreen from './main-individual.screen';
import ProfileScreen from './profile.screen';
import SettingsNavigator from './settings';

const IndividualStack =
  createNativeStackNavigator<IndividualRouteStackParamList>();

const IndividualNavigator = (): JSX.Element => {
  return (
    <IndividualStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainIndividual"
    >
      <IndividualStack.Screen
        name="MainIndividual"
        component={MainIndividualScreen}
      />
      <IndividualStack.Screen
        name="HomeManagement"
        component={HomeManagementNavigator}
      />
      <IndividualStack.Screen name="Profile" component={ProfileScreen} />
      <IndividualStack.Screen name="Settings" component={SettingsNavigator} />
    </IndividualStack.Navigator>
  );
};

export default IndividualNavigator;
