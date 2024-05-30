import { NavigatorScreenParams } from '@react-navigation/native';

import { HomeManagementRouteStackParamList } from './home-management.route';

export type IndividualRouteStackParamList = {
  MainIndividual: undefined;
  HomeManagement: NavigatorScreenParams<HomeManagementRouteStackParamList>;
  Profile: undefined;
  Feedback: undefined;
  MessageCenter: undefined;
  Settings: undefined;
};

export type MessageCenterRouteStackParamList = {
  AlarmMessage: undefined;
  HomeMessage: undefined;
};
