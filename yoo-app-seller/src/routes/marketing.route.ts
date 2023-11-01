import {IVoucher} from '@/features/voucher/voucher.model';
import {NavigatorScreenParams} from '@react-navigation/native';

export const VOUCHER_DETAIL_SCREEN_TYPE = {
  EDIT_INCOMING: 1,
  EDIT_RUNNING: 2,
  DISABLE_EDIT: 3,
};

export type PromotionStackParamList = {
  PromotionListScreen: undefined;
  PromotionDetailScreen: {
    promotionInfo?: IVoucher;
  };
  PromotionCreateScreen: {
    type: 1 | 2;
  };
};

export type AdvertisementStackParamList = {
  AdvertisementListScreen: undefined;
  CreateAdvertisementScreen: undefined;
};

export type FlashSaleStackParamList = {
  FlashSaleListScreen: undefined;
};

export type VoucherStackParamList = {
  VoucherListScreen: undefined;
  // VoucherDetailScreen: {
  //   voucherInfo: IVoucher;
  //   showStyle: number;
  // };
  CreateVoucherStack: NavigatorScreenParams<CreateVoucherStackParamList>;
  UpdateVoucherStack: NavigatorScreenParams<UpdateVoucherStackParamList>;
};
export type CreateVoucherStackParamList = {
  CreateVoucherScreen: {
    type: 1 | 2;
    scope: 1 | 2;
  };
  VoucherChooseItem: {};
};
export type UpdateVoucherStackParamList = {
  UpdateVoucherScreen: {
    voucherInfo: IVoucher;
    showStyle: number;
  };
  UpdateChooseItem: {voucherInfo: IVoucher; showStyle: number};
};

export type VoucherTabParamList = {
  IncomingVoucher: {};
  RunningVoucher: {};
  ExpiredVoucher: {};
};

export type MarketingStackParamList = {
  MarketingMainPage: undefined;
  PromotionStack: NavigatorScreenParams<PromotionStackParamList>;
  VoucherStack: NavigatorScreenParams<VoucherStackParamList>;
  AdvertisementStack: NavigatorScreenParams<AdvertisementStackParamList>;
  FlashSaleStack: NavigatorScreenParams<FlashSaleStackParamList>;
};

export type AdvertisementTabParamList = {
  All: undefined;
  Pending: undefined;
  OnGoing: undefined;
};

export const AdTabRoute = {
  All: 'All',
  Pending: 'Pending',
  OnGoing: 'OnGoing',
};
