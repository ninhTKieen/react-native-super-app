import {NavigatorScreenParams} from '@react-navigation/native';
import {IOrder} from '@/features/order/order.model';

export type OrderStackParamList = {
  ListOrderScreen: NavigatorScreenParams<OrderTabParamList>;
  OrderDetailScreen: {
    order: IOrder;
  };
};
export type OrderTabParamList = {
  PendingOrder: {
    formId: number;
  };
  ToShipOrder: NavigatorScreenParams<ToShipOrderParamList>;
  ShippingOrder: {
    formId: number;
  };
  CompleteOrder: {
    formId: number;
  };
  CancelOrder: {
    formId: number;
  };
  RefundOrder: {
    formId: number;
  };
};

export type ToShipOrderParamList = {
  GetAll: {
    formId: number;
  };
  GetByProcessing: {
    formId: number;
  };
  GetByProcessed: {
    formId: number;
  };
};

export type CancelOrderParamList = {
  GetAll: {};
  WaitingResponse: {};
  Cancelled: {};
};

export const CancelOrderRouteName = {
  GET_ALL: 'GetAll',
  WAIT_RESPONSE: 'WaitingResponse',
  CANCELLED: 'Cancelled',
};
