import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {IOrder} from '@/features/order/order.model';
import {color} from '@/configs/globalStyles';
import ImageCustomer from '@/components/common/image-customer';
import LocationIcon from '@/assets/order/location.svg';
import {IBooking} from '@/features/booking/booking.model';

type Props = {
  booking?: IBooking;
};

const {width} = Dimensions.get('screen');

const BookingOverallDetail = ({booking}: Props) => {
  const {t} = useTranslation();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', width: '75%'}}>
          <Avatar.Text
            size={50}
            label={booking?.recipientAddress?.name[0] ?? ''}
            style={{
              backgroundColor: color.primary,
            }}
            color={color.white}
          />
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
              }}>
              {booking?.recipientAddress?.name ?? ''}
            </Text>
            <View
              style={{flexDirection: 'row', width: '85%', marginVertical: 5}}>
              <LocationIcon width={20} height={20} />
              <Text
                style={{
                  marginHorizontal: 5,
                  color: color.grey6,
                  fontWeight: '500',
                }}>
                {booking?.recipientAddress?.fullAddress ?? ''}
              </Text>
            </View>
          </View>
        </View>

        <View style={{width: '25%'}}>
          <Text
            style={{
              color: color.primary,
              fontWeight: '600',
              textAlign: 'right',
            }}>
            {t(i18nKeys.order.pending)}
          </Text>
        </View>
      </View>
      {booking?.bookingItemList &&
        booking?.bookingItemList.map(el => {
          return (
            <View style={{flexDirection: 'row'}} key={el.id}>
              <ImageCustomer
                source={{uri: el.imageUrl}}
                style={{
                  backgroundColor: 'gray',
                  width: 0.2 * width,
                  aspectRatio: 1,
                  borderColor: color.blueDark1,
                  borderWidth: 2,
                  borderRadius: 10,
                }}
                widthImg={width * 0.2}
                heightImg={width * 0.2}
              />
              <View
                style={{
                  paddingLeft: '3%',
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
                <Text style={styles.txtNormal}>{el.itemName}</Text>
                <View
                  style={{
                    paddingVertical: '2%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.txtVariant}>{`${el.name}`}</Text>
                  <Text style={styles.txtNormal}>x{el.quantity}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View />
                  <Text style={styles.txtMoneyNormal}>
                    <Text style={styles.txtMoneyDisable}>
                      {Intl.NumberFormat('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(el.originalPrice ? el.originalPrice : 0)}
                    </Text>{' '}
                    {Intl.NumberFormat('vn-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(el.currentPrice ? el.currentPrice : 0)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
    </>
  );
};

const styles = StyleSheet.create({
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

  txtNormal: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default BookingOverallDetail;
