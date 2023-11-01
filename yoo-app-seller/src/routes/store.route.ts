import {IStore} from '@/features/store/store.model';
import {NavigatorScreenParams} from '@react-navigation/native';
import {ItemStackParamList} from './item.route';
import {MarketingStackParamList} from './marketing.route';
import {OrderStackParamList} from './order.route';
import {ItemBookingStackParamList} from './item-booking.route';
import {RatingStackParamList} from './rating.route';

export const storeRoutes = {
  root: 'PartnerStoreStack',

  list: 'PartnerStoreList',
  create: 'CreatePartnerStore',
  detail: 'PartnerStoreDetail',
  mainpage: 'PartnerStoreMainPage',
};

export type EditStoreStackParamList = {
  EditMainPage: {
    inforStore?: IStore;
  };
  EditDescription: {
    defaultValue: string;
  };
};

export type CreateStoreStackParamList = {
  CreateMainPage: {};
  CreateDescription: {
    defaultValue?: string;
  };
};

export type PartnerStoreStackParamList = {
  PartnerStoreMainPage: {};
  PartnerStoreList: {};
  PartnerStoreDetail: {};
  ItemStack: NavigatorScreenParams<ItemStackParamList>;
  ItemBookingStack: NavigatorScreenParams<ItemBookingStackParamList>;
  ItemDefaultScreen: {
    storeInfor: IStore;
  };
  Order: NavigatorScreenParams<OrderStackParamList>;
  EditStoreStack: NavigatorScreenParams<EditStoreStackParamList>;
  CreateStoreStack: NavigatorScreenParams<CreateStoreStackParamList>;
  MarketingStack: NavigatorScreenParams<MarketingStackParamList>;
  StatisticScreen: {};
  DetailStoreScreen: {};
  RatingStack: NavigatorScreenParams<RatingStackParamList>;
  PartnerStoreNotify: {};
};

export type StaticTabParamList = {
  ProductSalesTab: {};
  ProductQuantityTab: {};
};
