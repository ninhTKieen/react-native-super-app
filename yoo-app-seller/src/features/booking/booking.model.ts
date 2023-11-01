import {IRecipientAddress} from '../order/order.model';

export enum BookingFormId {
  GET_ALL = 20,
  WAITING = 21,
  CONFIRMED = 22,
  COMPLETED = 23,
  CANCELLATION_GET_ALL = 24,
  CANCELLATION_TO_RESPOND = 241,
  CANCELLATION_CANCELLED = 242,
  RETURN_REFUND = 25,
  RETURN_REFUND_NEW_REQUEST = 251,
  RETURN_REFUND_RESPONDED = 252,
  RETURN_REFUND_COMPLETED = 253,
}
export interface IBooking {
  id: number;
  tenantId: number;
  bookingCode: string;
  name: string;
  phoneNumber: string;
  email: string;
  providerId: number;
  type: number;
  bookerId: number;
  totalPrice: number;
  state: number;
  bookingItemList: Array<{
    id: number;
    tenantId: number;
    isDefault: boolean;
    name: string;
    itemId: number;
    originalPrice: number;
    currentPrice: number;
    imageUrl: string;
    quantity: number;
    itemName: string;
  }>;
  recipientAddress?: IRecipientAddress;
  paymentMethod: string;
  checkIn: Date;
  checkOut: Date;
  description: string;
  creationTime: Date;
  providerName: string;
  quantity: number;
  creatorUserId: number;
  partnerId: number;
  detailCancelRefund?: string;
}
export interface IPageBooking {
  items: Array<IBooking>;
  totalRecords: number;
}
export enum BookingConfirmationState {
  CONFIRM = 1,
  REFUSE = 1,
  CANCELED = 42,
  CONFIRM_SHIPPER_COMPLETED = 3,
  CONFIRM_CANCEL = 4,
}
