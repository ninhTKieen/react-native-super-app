import React, {useState} from 'react';
import {ScrollView, Text, View, Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';

import {useTranslation} from 'react-i18next';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {OrderStackParamList} from '@/routes/order.route';
import {color} from '@/configs/globalStyles';
import {OrderTrackingState} from '@/features/order/order.model';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import {
  OrderResponseState,
  OrderConfirmationState,
} from '@/features/order/order.model';

import TopBar from '@/components/top-bar';
import OrderOverallDetail from './components/order-overall-detail';
import orderService from '@/features/order/order.service';
import Toast from 'react-native-toast-message';
import DeclineReasonModal from './components/decline-reason-modal';

const {width} = Dimensions.get('screen');

const customStepStyles = {
  stepStrokeCurrentColor: 'transparent',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: color.grey6,
  separatorFinishedColor: color.grey6,
  separatorUnfinishedColor: color.primary,
  stepIndicatorUnFinishedColor: '#aaaaaa',
  stepIndicatorCurrentColor: color.primary,
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  currentStepLabelColor: color.blue2,
};

const OrderDetailScreen = () => {
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const providerId = useAppSelector(selectCurrentStore);

  const navigation =
    useNavigation<NavigationProp<OrderStackParamList, 'OrderDetailScreen'>>();
  const route = useRoute<RouteProp<OrderStackParamList, 'OrderDetailScreen'>>();
  const order = route.params.order;

  const [curPos] = useState(order.trackingInfo.length - 1);
  const [declineReason, setDeclineReason] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
      navigation.goBack();
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
      navigation.goBack();
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.order.detail.title)} />
      <View style={{marginTop: 20}}>
        <OrderOverallDetail order={order} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderColor: '#F1F2F8',
          paddingVertical: '2%',
          marginTop: '2%',
        }}>
        <Text style={styles.txtOrderCode}>
          {t(i18nKeys.order.orderItem.orderCode)}
        </Text>
        <Text style={{color: color.primary, fontWeight: '600'}}>
          {order.orderCode}
        </Text>
      </View>

      <View
        style={{
          marginVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: color.grey6, fontSize: 18}}>
          {t(i18nKeys.order.detail.shippingInfo)}
        </Text>
      </View>

      <View style={{}}>
        <StepIndicator
          customStyles={customStepStyles}
          currentPosition={curPos}
          labels={order.trackingInfo.map(e => e.trackingItemTime)}
          stepCount={order.trackingInfo.length}
          direction="vertical"
          renderLabel={({position}) => {
            return (
              <View style={styles.lblContainer}>
                <Text
                  style={[
                    styles.label,
                    {
                      color: curPos === position ? color.primary : color.grey6,
                    },
                  ]}>
                  {order.trackingInfo[position].trackingItemState ===
                    OrderTrackingState.PLACED &&
                    t(i18nKeys.order.detail.orderPlaced)}
                  {order.trackingInfo[position].trackingItemState ===
                    OrderTrackingState.PREPARE_TO_SHIP &&
                    t(i18nKeys.order.detail.preparing)}
                  {order.trackingInfo[position].trackingItemState ===
                    OrderTrackingState.SHIPPING &&
                    t(i18nKeys.order.detail.inTransit)}
                  {order.trackingInfo[position].trackingItemState ===
                    OrderTrackingState.DELIVERED &&
                    t(i18nKeys.order.detail.delivered)}
                  {order.trackingInfo[position].trackingItemState ===
                    OrderTrackingState.CANCELLED &&
                    t(i18nKeys.order.detail.cancelled)}
                </Text>
                <Text style={styles.dateTime}>
                  {order.trackingInfo[position].trackingItemTime}
                </Text>
              </View>
            );
          }}
        />
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
                setModalVisible(true);
              }}
              icon="close"
              mode="outlined"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{borderColor: color.red5}}
              textColor={color.red5}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    padding: '2%',
  },

  txtOrderCode: {
    color: '#707386',
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: '2%',
  },

  lblContainer: {
    width: width * 0.9,
    padding: 10,
    paddingLeft: 5,
    marginVertical: 10,
  },

  label: {
    fontWeight: '500',
    fontSize: 16,
  },

  status: {
    paddingTop: 5,
    fontSize: 13,
  },

  dateTime: {
    fontSize: 15,
    marginTop: 5,
  },

  buttonWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: color.white,
    padding: 10,
  },
});

export default OrderDetailScreen;
