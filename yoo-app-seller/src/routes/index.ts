import {storeRoutes} from './store.route';
import {itemRoutes} from './item.route';
import {NavigatorScreenParams} from '@react-navigation/native';
import {ChatStackParamList} from './chat.route';
import {OrderStackParamList} from './order.route';

export const routes = {
  store: storeRoutes,
  item: itemRoutes,

  auth: 'AuthNavigator',
  chat: 'ChatNavigator',
  bottom_tabs: 'BottomTabsNavigator',
  home: 'Home',
  order: 'Order',
  report: 'Report',
  noti: 'Notification',
  individual: 'Individual',
};
export type MainBottomTabParamList = {
  AuthNavigator: {};
  PartnerStoreChatStack: NavigatorScreenParams<ChatStackParamList>;
  BottomTabsNavigator: {};
  Home: {};
  Order: NavigatorScreenParams<OrderStackParamList>;
  Report: undefined;
  Notification: undefined;
  Individual: undefined;
};
