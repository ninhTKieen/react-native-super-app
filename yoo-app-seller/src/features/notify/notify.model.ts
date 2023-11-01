export interface INotify {
  totalCount: number;
  totalUnread: number;
  items: Array<INotifyItem>;
}

export interface INotifyItem {
  id: string;
  tenantIds: string;
  notificationName: string;
  data: string;
  dataTypeName: any;
  entityTypeName: any;
  entityTypeAssemblyQualifiedName: any;
  entityId: any;
  severity: number;
  type: number;
  excludedUserIds: any;
  creationTime: string;
  creatorUserId: number;
  state: number;
}

export enum NotifyState {
  UNREAD = 1,
  READ = 2,
}

export const UserAction = {
  CREATE_ORDER_SUCCESS: 'App.CreateOrderSuccessAction',
  CANCEL: 'App.UserCancelAction',
  REQ_CANCEL: 'App.UserRequestCancelAction',
  SHIPPING_ORDER: 'App.ShippingOrderAction',
  SHIPPER_COMPLETED: 'App.ShipperCompletedAction',
};
