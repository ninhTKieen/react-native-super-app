import {NavigatorScreenParams} from '@react-navigation/native';
import {IBooking} from '@/features/booking/booking.model';

export type BookingStackParamList = {
  ListBookingScreen: NavigatorScreenParams<BookingTabParamList>;
  BookingDetailScreen: {
    bookingId: number;
  };
};
export type BookingTabParamList = {
  PendingBooking: {
    formId: number;
  };
  ConfirmedBooking: {
    formId: number;
  };
  CompleteBooking: {
    formId: number;
  };
  CancelBooking: {
    formId: number;
  };
  RefundBooking: {
    formId: number;
  };
};
