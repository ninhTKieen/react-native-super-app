export interface IOrderItem {
  id: number;
  tenantId: number;
  name: string;
  itemId: number;
  sku: string;
  stock: number;
  originalPrice: number;
  currentPrice: number;
  tierIndex: number[];
  imageUrl: string;
  quantity: number;
  itemName: string;
}

export interface IRecipientAddress {
  name: string;
  phone: string;
  town: string;
  district: string;
  city: string;
  fullAddress: string;
}
export interface ITrackingInfo {
  trackingItemTime: string;
  trackingItemState: number;
  trackingItemDetail: string;
}

export interface IOrder {
  id: number;
  providerId: number;
  orderCode: string;
  tenantId: number;
  type: number;
  ordererId: number;
  totalPrice: number;
  state: number;
  quantity: number;
  creationTime: Date;
  orderItemList: IOrderItem[];
  recipientAddress: IRecipientAddress;
  trackingInfo: ITrackingInfo[];
  paymentMethod: string;
  providerName: string;
}

export interface IListOrder {
  orders: IOrder[];
  totalRecords: number;
}

export enum OrderTrackingState {
  PLACED = 1,
  PREPARE_TO_SHIP = 2,
  SHIPPING = 3,
  DELIVERED = 4,
  CANCELLED = 5,
}

export enum OrderConfirmationState {
  CONFIRM = 1,
  CONFIRM_SHIPPING = 2,
  CONFIRM_SHIPPER_COMPLETED = 3,
  CONFIRM_CANCEL = 4,
}

export enum OrderFormId {
  GET_ALL = 20,
  WAITING = 21,
  TO_SHIP = 22,
  TO_SHIP_TO_PROCESS = 221,
  TO_SHIP_PROCESSED = 222,
  SHIPPING = 23,
  COMPLETED = 24,
  CANCELLATION_GET_ALL = 25,
  CANCELLATION_TO_RESPOND = 251,
  CANCELLATION_CANCELLED = 252,
  RETURN_REFUND = 26,
  RETURN_REFUND_NEW_REQUEST = 261,
  RETURN_REFUND_TO_RESPOND = 262,
  RETURN_REFUND_RESPONDED = 263,
  RETURN_REFUND_COMPLETED = 264,
}

export enum OrderSortState {
  NEWEST = 1,
  OLDEST = 2,
  PRICE_ASC = 3,
  PRICE_DESC = 4,
}

export enum OrderResponseState {
  TO_PAY = 1,
  TO_SHIP_TO_PROCESS = 21,
  SHIPPING = 3,
  SHIPPER_COMPLETED = 41,
  USER_COMPLETED = 42,
  CANCELLATION_TO_RESPOND = 51,
  CANCELLATION_CANCELLED = 52,
  RETURN_REFUND_NEW_REQUEST = 61,
  RETURN_REFUND_TO_RESPOND = 62,
  RETURN_REFUND_RESPONDED = 63,
  RETURN_REFUND_COMPLETED = 64,
}

export enum OrderRefuseState {
  CANCEL = 1,
  CANCEL_REQUEST = 2,
}
