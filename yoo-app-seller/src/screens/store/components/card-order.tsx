import React from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowDouble from '../../../assets/store/icons/arrow_double.svg';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const {width, height} = Dimensions.get('screen');
type Props = {
  data: {
    cancelled: number;
    completed: number;
    returnRefund: number;
    shipping: number;
    toPay: number;
    toShip: number;
  };
};
const OrderCard = ({data}: Props) => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const OrderBriefOfStore = [
    {
      name: t(i18nKeys.order.pending),
      color: '#339FD9',
      example: 15,
    },
    {
      name: t(i18nKeys.order.cancel.title),
      color: '#339FD9',
      example: 0,
    },
    {
      name: t(i18nKeys.order.refund),
      color: '#339FD9',
      example: 1,
    },
    {
      name: t(i18nKeys.order.rate),
      color: '#D30000',
      example: 29,
    },
  ];
  const getNumber = (index: number) => {
    switch (index) {
      case 0:
        return data?.toPay ?? 0;
      case 1:
        return data?.cancelled ?? 0;
      case 2:
        return data?.returnRefund ?? 0;
      case 3:
        return 0;
      default:
        return 0;
    }
  };
  return (
    <View
      style={{
        paddingHorizontal: width * 0.04,
      }}>
      <View style={styles.containerTitle}>
        <Text style={styles.txtTitle}>{t(i18nKeys.order.title)}</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Order', {
              screen: 'ListOrderScreen',
              params: {
                screen: 'PendingOrder',
                params: {
                  formId: 21,
                },
              },
            });
          }}>
          <Text style={styles.txtBtnAllOrder}>
            {t(i18nKeys.order.viewHistory)}
          </Text>
          <ArrowDouble />
        </TouchableOpacity>
      </View>
      <View style={styles.containerOrderBrief}>
        {OrderBriefOfStore.map((orderBrief, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.containerOrderBriefItem}
              onPress={() => {
                switch (index) {
                  case 0:
                    navigation.navigate('Order', {
                      screen: 'ListOrderScreen',
                      params: {
                        screen: 'PendingOrder',
                        params: {
                          formId: 21,
                        },
                      },
                    });
                    break;
                  case 1:
                    navigation.navigate('Order', {
                      screen: 'ListOrderScreen',
                      params: {
                        screen: 'CancelOrder',
                        params: {
                          formId: 24,
                        },
                      },
                    });
                    break;
                  case 2:
                    navigation.navigate('Order', {
                      screen: 'ListOrderScreen',
                      params: {
                        screen: 'RefundOrder',
                        params: {
                          formId: 25,
                        },
                      },
                    });
                    break;
                  case 3:
                    navigation.navigate('RatingStack', {
                      screen: 'RatingScreen',
                      params: {},
                    });
                    break;
                  default:
                    break;
                }
              }}>
              <Text
                style={{
                  color: orderBrief.color,
                  fontSize: 19,
                  fontWeight: '600',
                }}>
                {getNumber(index)}
              </Text>
              <Text style={styles.txtOrderBriefItem}>{orderBrief.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  containerOrderBrief: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F1F2F8',
    borderRadius: 10,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.0256,
  },
  containerOrderBriefItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.19,
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  txtOrderBriefItem: {
    fontSize: 10,
    fontWeight: '600',
    color: '#878A9C',
    paddingTop: width * 0.0142,
    maxWidth: width * 0.18,
    textAlign: 'center',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: height * 0.019,
    paddingTop: height * 0.0237,
  },
  txtTitle: {
    fontSize: 18,
    color: '#2B5783',
    fontWeight: '600',
  },
  txtBtnAllOrder: {
    paddingRight: width * 0.0154,
    fontSize: 13,
    fontWeight: '500',
    color: '#707386',
  },
});
