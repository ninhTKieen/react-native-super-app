import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './profile.screen';
import EditProfileScreen from './edit-profile.screen';
import {ProfileStackParamList} from '@/routes/profile.route';
import SettingStackNavigator from './setting.stack';
import LanguageScreen from './language-screen';
import RatingStackNavigator from '../rating';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="ProfileMainScreen" component={ProfileScreen} />
      <Stack.Screen name="SettingStack" component={SettingStackNavigator} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
      <Stack.Screen name="RateStack" component={RatingStackNavigator} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
