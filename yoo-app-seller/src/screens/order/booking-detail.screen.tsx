import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BookingStackParamList} from '@/routes/booking.route';
import {useQuery} from '@tanstack/react-query';
import bookingService from '@/features/booking/booking.service';
import BookingOverallDetail from './components/booking-overall-detail';
import {BookingConfirmationState} from '@/features/booking/booking.model';
import Clipboard from '@react-native-clipboard/clipboard';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import CopyIcon from '@/assets/order/copy.svg';
import {color} from '@/configs/globalStyles';
import LoadingModal from '@/components/modals/loading-modal';
type Props = NativeStackScreenProps<
  BookingStackParamList,
  'BookingDetailScreen'
>;
const BookingDetailScreen = ({route}: Props) => {
  const {t} = useTranslation();
  const bookingId = route.params.bookingId;
  const {data, isLoading} = useQuery({
    queryKey: ['bookingDetail', bookingId],
    queryFn: () => bookingService.getBookingById({id: bookingId}),
  });

  return (
    <View>
      <TopBar title={t(i18nKeys.order.detail.title)} />
      <View style={styles.containerSection}>
        <BookingOverallDetail booking={data} />
      </View>
      <View style={styles.bookingCodeWrapper}>
        <Text style={styles.txtBookingCode}>
          {t(i18nKeys.order.orderItem.orderCode)}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            Clipboard.setString(data?.bookingCode ?? '');
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                color: color.primary,
                fontWeight: '600',
                marginRight: 5,
              }}>
              {data?.bookingCode}
            </Text>
            <CopyIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>
      {data?.state === BookingConfirmationState.CANCELED &&
        data?.detailCancelRefund && (
          <View style={styles.containerSection}>
            <Text
              style={{
                color: '#707386',
                fontSize: 14,
                fontWeight: '600',
              }}>
              Lý do hủy đơn: {JSON.parse(data?.detailCancelRefund)?.Reason}
            </Text>
          </View>
        )}
      {isLoading && <LoadingModal />}
    </View>
  );
};

export default BookingDetailScreen;

const styles = StyleSheet.create({
  containerSection: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  bookingCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderColor: '#F1F2F8',
    padding: '2%',
    backgroundColor: 'white',
  },
  txtBookingCode: {
    color: '#707386',
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: '2%',
  },
});
