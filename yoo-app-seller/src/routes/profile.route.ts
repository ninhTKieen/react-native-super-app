import {NavigatorScreenParams} from '@react-navigation/native';
import {RatingStackParamList} from './rating.route';

export type SettingStackParamList = {
  ChangePasswordScreen: {};
  SecurityScreen: {};
};

export type ProfileStackParamList = {
  ProfileMainScreen: {};
  EditProfileScreen: {};
  LanguageScreen: {};
  SettingStack: NavigatorScreenParams<SettingStackParamList>;
  RateStack: NavigatorScreenParams<RatingStackParamList>;
};
