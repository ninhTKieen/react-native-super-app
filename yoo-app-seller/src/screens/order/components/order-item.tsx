import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {IOrder} from '@/features/order/order.model';
import {useTranslation} from 'react-i18next';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {OrderStackParamList} from '@/routes/order.route';
import {color} from '@/configs/globalStyles';
import Toast from 'react-native-toast-message';
import DeclineReasonModal from './decline-reason-modal';
import IconGeneral from '@/components/common/icon-general';
import CopyIcon from '@/assets/order/copy.svg';
import orderService from '@/features/order/order.service';
import {
  OrderConfirmationState,
  OrderResponseState,
  OrderRefuseState,
} from '@/features/order/order.model';
import OrderOverallDetail from './order-overall-detail';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';

const {width} = Dimensions.get('screen');
type Props = {
  order: IOrder;
  formId: number;
};

const OrderItem = ({order}: Props) => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<OrderStackParamList>>();
  const [declineReason, setDeclineReason] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const providerId = useAppSelector(selectCurrentStore);

  const {mutate: acceptOrder} = useMutation({
    mutationFn: ({type}: {type: number}) =>
      orderService.acceptOrder({id: order.id, type}),
    onSuccess: () => {
      queryClient.refetchQueries(['orders', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.acceptSuccessMsg) as string,
      });
    },
    onError: error => {
      console.log('[ACCEPT ORDER]', error);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.common.errorMessage) as string,
      });
    },
  });

  const {mutate: declineOrder} = useMutation({
    mutationFn: () =>
      orderService.cancelOrder({id: order.id, reason: declineReason}),
    onSuccess: () => {
      queryClient.refetchQueries(['orders', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.acceptSuccessMsg) as string,
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

  const {mutate: refuseOrder} = useMutation({
    mutationFn: () =>
      orderService.refuseOrder({
        id: order.id,
        type: OrderRefuseState.CANCEL_REQUEST,
      }),
    onSuccess: () => {
      queryClient.refetchQueries(['orders', providerId]);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.order.acceptSuccessMsg) as string,
      });
    },
    onError: error => {
      console.log('[REFUSE ORDER]', error);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.common.errorMessage) as string,
      });
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          padding: '2%',
          backgroundColor: 'white',
          marginTop: '2%',
        }}
        onPress={() => {
          navigation.navigate('OrderDetailScreen', {
            order,
          });
        }}>
        <OrderOverallDetail order={order} />
        <View style={styles.totalContainer}>
          <Text style={styles.txtTotalQuantity}>
            {order.quantity} {t(i18nKeys.order.orderItem.product)}
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
                }).format(order.totalPrice ? order.totalPrice : 0)}
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.orderCodeWrapper}>
        <Text style={styles.txtOrderCode}>
          {t(i18nKeys.order.orderItem.orderCode)}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => {
            Clipboard.setString(order.orderCode);
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{color: color.primary, fontWeight: '600', marginRight: 5}}>
              {order.orderCode}
            </Text>
            <CopyIcon />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.orderCodeWrapper}>
        <Text style={styles.txtOrderCode}>{t(i18nKeys.order.orderTime)}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{color: color.primary, fontWeight: '600', marginRight: 5}}>
            {String(order.creationTime)}
          </Text>
        </View>
      </View>

      {order.state === OrderResponseState.TO_PAY && (
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                acceptOrder({type: OrderConfirmationState.CONFIRM});
              }}
              icon="check"
              contentStyle={{flexDirection: 'row-reverse'}}
              mode="contained"
              style={{backgroundColor: color.primary}}>
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
              mode="outlined"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{borderColor: color.primary}}
              textColor={color.primary}>
              {t(i18nKeys.common.decline)}
            </Button>
          </View>
        </View>
      )}

      {order.state === OrderResponseState.TO_SHIP_TO_PROCESS && (
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
      )}

      {order.state === OrderResponseState.SHIPPING && (
        <View
          style={[
            styles.buttonWrapper,
            {
              flexDirection: 'row-reverse',
            },
          ]}>
          <Button
            onPress={() => {
              acceptOrder({
                type: OrderConfirmationState.CONFIRM_SHIPPER_COMPLETED,
              });
            }}
            icon="check"
            contentStyle={{flexDirection: 'row-reverse'}}
            mode="contained"
            buttonColor={color.primary}
            style={{borderColor: color.primary}}>
            {t(i18nKeys.order.deliveryConfirm)}
          </Button>
        </View>
      )}

      {order.state === OrderResponseState.CANCELLATION_TO_RESPOND && (
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                acceptOrder({type: OrderConfirmationState.CONFIRM_CANCEL});
              }}
              icon="check"
              contentStyle={{flexDirection: 'row-reverse'}}
              mode="contained"
              style={{backgroundColor: color.primary}}>
              {t(i18nKeys.common.accept)}
            </Button>
          </View>
          <View style={{width: 10}} />
          <View style={{flex: 1.5}}>
            <Button
              onPress={() => {
                refuseOrder();
              }}
              icon="close"
              mode="outlined"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{borderColor: color.primary}}
              textColor={color.primary}>
              {t(i18nKeys.common.decline)}
            </Button>
          </View>
        </View>
      )}

      <DeclineReasonModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        declineReason={declineReason}
        setDeclineReason={setDeclineReason}
        onPressOk={() => {
          declineOrder();
          setModalVisible(false);
          setDeclineReason('');
        }}
      />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    marginBottom: 8,
  },

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

  txtOrderCode: {
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

  orderCodeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderColor: '#F1F2F8',
    padding: '2%',
  },
});
