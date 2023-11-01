import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {BookingStackParamList} from '@/routes/booking.route';
import IconGeneral from '@/components/common/icon-general';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {
  BookingConfirmationState,
  BookingFormId,
  IBooking,
} from '@/features/booking/booking.model';
import BookingOverallDetail from './booking-overall-detail';
import Clipboard from '@react-native-clipboard/clipboard';
import CopyIcon from '@/assets/order/copy.svg';
import bookingService from '@/features/booking/booking.service';
import Toast from 'react-native-toast-message';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import DeclineReasonModal from './decline-reason-modal';

const {width} = Dimensions.get('screen');
type Props = {
  booking: IBooking;
  formId: number;
};
const BookingItem = ({booking, formId}: Props) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<BookingStackParamList>>();
  const providerId = useAppSelector(selectCurrentStore);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {mutate: acceptBooking} = useMutation({
    mutationFn: ({type}: {type: number}) =>
      bookingService.acceptBooking({id: booking.id, type}),
    onSuccess: () => {
      queryClient.refetchQueries(['booking', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.acceptSuccessMsg) as string,
      });
    },
    onError: (error: any) => {
      console.log('[ACCEPT BOOKING]', error);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.common.errorMessage) as string,
      });
    },
  });
  const {mutate: declineBooking} = useMutation({
    mutationFn: () =>
      bookingService.refuseBooking({
        id: booking.id,
        type: BookingConfirmationState.REFUSE,
      }),
    onSuccess: () => {
      queryClient.refetchQueries(['booking', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.declineSuccessMsg) as string,
      });
    },
    onError: error => {
      console.log('[DECLINE ORDER]', error);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.common.errorMessage) as string,
      });
    },
  });
  const {mutate: cancelBooking} = useMutation({
    mutationFn: () =>
      bookingService.cancelBooking({
        id: booking.id,
        reason: cancelReason,
      }),
    onSuccess: () => {
      queryClient.refetchQueries(['booking', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.declineSuccessMsg) as string,
      });
    },
    onError: error => {
      console.log('[DECLINE ORDER]', error);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.common.errorMessage) as string,
      });
    },
  });
  return (
    <View>
      <TouchableOpacity
        style={{
          padding: '2%',
          backgroundColor: 'white',
          marginTop: '2%',
        }}
        onPress={() => {
          navigation.navigate('BookingDetailScreen', {
            bookingId: booking.id,
          });
        }}>
        <BookingOverallDetail booking={booking} />
        <View style={styles.totalContainer}>
          <Text style={styles.txtTotalQuantity}>
            {booking?.quantity} {t(i18nKeys.order.orderItem.product)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconGeneral
              name="money-bill-wave"
              type="FontAwesome5"
              color={color.primary}
              size={20}
            />
            <Text style={{paddingLeft: 8, ...styles.txtNormal}}>
              {t(i18nKeys.order.orderItem.Money)}:{' '}
              <Text style={styles.txtMoneyNormal}>
                {Intl.NumberFormat('vn-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(booking?.totalPrice ? booking.totalPrice : 0)}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.bookingCodeWrapper}>
          <Text style={styles.txtBookingCode}>
            {t(i18nKeys.order.orderItem.orderCode)}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => {
              Clipboard.setString(booking.bookingCode);
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: color.primary,
                  fontWeight: '600',
                  marginRight: 5,
                }}>
                {booking.bookingCode}
              </Text>
              <CopyIcon />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>

      {formId === BookingFormId.WAITING && (
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                acceptBooking({type: BookingConfirmationState.CONFIRM});
              }}
              icon="check"
              contentStyle={{flexDirection: 'row-reverse'}}
              mode="outlined"
              style={{borderColor: color.primary}}
              textColor={color.primary}>
              {t(i18nKeys.common.accept)}
            </Button>
          </View>
          <View style={{width: 10}} />
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                declineBooking();
                // setModalVisible(true);
              }}
              icon="close"
              mode="contained"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{backgroundColor: color.red}}>
              {t(i18nKeys.common.decline)}
            </Button>
          </View>
        </View>
      )}

      {/* {confirmedOrderState.includes(formId) && (
        <View
          style={[
            styles.buttonWrapper,
            {
              flexDirection: 'row-reverse',
            },
          ]}>
          <Button
            onPress={() => {
              acceptOrder({type: OrderConfirmationState.CONFIRM_SHIPPING});
            }}
            icon="check"
            contentStyle={{flexDirection: 'row-reverse'}}
            mode="contained"
            buttonColor={color.primary}
            style={{borderColor: color.primary}}>
            {t(i18nKeys.order.delivery)}
          </Button>
        </View>
      )} */}

      {formId === BookingFormId.CONFIRMED && (
        <View
          style={[
            styles.buttonWrapper,
            {
              flexDirection: 'row-reverse',
            },
          ]}>
          <Button
            onPress={() => {
              // acceptOrder({
              //   type: BookingConfirmationState.CONFIRM_SHIPPER_COMPLETED,
              // });
              setModalVisible(true);
            }}
            icon="close"
            contentStyle={{flexDirection: 'row-reverse'}}
            mode="contained"
            buttonColor={color.primary}
            style={{borderColor: color.primary}}>
            {t(i18nKeys.itemBooking.flow.cancel)}
          </Button>
        </View>
      )}

      {/* {formId === BookingFormId.CANCELLATION_TO_RESPOND && (
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                acceptOrder({type: OrderConfirmationState.CONFIRM_CANCEL});
              }}
              icon="check"
              contentStyle={{flexDirection: 'row-reverse'}}
              mode="outlined"
              style={{borderColor: color.primary}}
              textColor={color.primary}>
              {t(i18nKeys.common.accept)}
            </Button>
          </View>
          <View style={{width: 10}} />
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                setModalVisible(true);
              }}
              icon="close"
              mode="contained"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{backgroundColor: color.red}}>
              {t(i18nKeys.common.decline)}
            </Button>
          </View>
        </View>
      )} */}

      <DeclineReasonModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        declineReason={cancelReason}
        setDeclineReason={setCancelReason}
        onPressOk={() => {
          cancelBooking();
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default BookingItem;

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: 'gray',
    width: 0.2 * width,
    aspectRatio: 1,
    borderColor: color.blueDark1,
    borderWidth: 2,
    borderRadius: 10,
  },

  txtMoneyNormal: {
    fontSize: 13,
    fontWeight: '400',
    color: color.primary,
  },

  txtMoneyDisable: {
    color: '#495057',
    textDecorationLine: 'line-through',
  },

  txtTotalQuantity: {
    fontSize: 12,
    fontWeight: '400',
    color: '#adb5bd',
  },

  txtVariant: {
    fontSize: 13,
    fontWeight: '400',
    color: '#6c757d',
  },

  txtBookingCode: {
    color: '#707386',
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: '2%',
  },

  txtNormal: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },

  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderColor: '#F1F2F8',
    paddingVertical: '2%',
    marginTop: '2%',
  },

  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: color.white,
    padding: 10,
  },
  bookingCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderColor: '#F1F2F8',
    padding: '2%',
  },
});
