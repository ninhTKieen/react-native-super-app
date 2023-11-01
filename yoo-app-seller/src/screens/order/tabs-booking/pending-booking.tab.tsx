import {View} from 'react-native';
import React from 'react';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {BookingTabParamList} from '@/routes/booking.route';
import ListBooking from '../components/list-booking';

type Props = MaterialTopTabScreenProps<BookingTabParamList, 'PendingBooking'>;
const PendingBookingTab = ({route}: Props) => {
  return (
    <View style={{flex: 1}}>
      <ListBooking formId={route.params.formId} />
    </View>
  );
};

export default PendingBookingTab;
