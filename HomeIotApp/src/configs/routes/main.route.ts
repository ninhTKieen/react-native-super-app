import { NavigatorScreenParams } from '@react-navigation/native';

import { IndividualRouteStackParamList } from './individual/individual.route';

export type MainRouteStackParamList = {
  Home: undefined;
  Individual: NavigatorScreenParams<IndividualRouteStackParamList>;
  Notifications: undefined;
  Scenes: undefined;
};
