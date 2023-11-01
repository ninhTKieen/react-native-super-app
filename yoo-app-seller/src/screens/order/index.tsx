import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListOrderScreen from './list-order.screen';
import {OrderStackParamList} from '@/routes/order.route';
import OrderDetailScreen from './order-detail.screen';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStoreInfor} from '@/features/store/store.slice';
import {useTypeStore} from '@/hooks/useTypeStore';
import ListBookingScreen from './list-booking.screen';
import {BookingStackParamList} from '@/routes/booking.route';
import BookingDetailScreen from './booking-detail.screen';

const Stack = createNativeStackNavigator<OrderStackParamList>();
const StackBooking = createNativeStackNavigator<BookingStackParamList>();

const OrderStack = () => {
  const InforStore = useAppSelector(selectCurrentStoreInfor);
  const typeStore = useTypeStore(InforStore?.type ?? undefined);

  return typeStore === 1 ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'ListOrderScreen'} component={ListOrderScreen} />
      <Stack.Screen name={'OrderDetailScreen'} component={OrderDetailScreen} />
    </Stack.Navigator>
  ) : (
    <StackBooking.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <StackBooking.Screen
        name={'ListBookingScreen'}
        component={ListBookingScreen}
      />
      <StackBooking.Screen
        name={'BookingDetailScreen'}
        component={BookingDetailScreen}
      />
    </StackBooking.Navigator>
  );
};

export default OrderStack;
