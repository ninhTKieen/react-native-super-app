import {IItemBooking} from '@/features/itemBooking/item-booking.model';

export type ItemBookingStackParamList = {
  ItemBookingList: {};
  CreateItemBooking: {
    idStore?: number;
  };
  AttributeCreateItemBooking: undefined;
  ArrayObjectAttributeCreate: {
    item: any;
  };
  ItemBookingDetail: {
    item: IItemBooking;
  };
};

export type ItemBookingListStackParamList = {
  Available: {
    status: number;
  };

  PendingApproval: {
    status: number;
  };

  Hidden: {
    status: number;
  };
};

export const ItemBookingListRoutes = {
  Available: 'Available',
  PendingApproval: 'PendingApproval',
  Hidden: 'Hidden',
};
