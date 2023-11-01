import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {VoucherStackParamList} from '@/routes/marketing.route';
import VoucherListScreen from './voucher-list.screen';
import CreateVoucherStack from './create-voucher/create-voucher.stack';
import UpdateVoucherStack from './edit-voucher/edit-voucher.stack';

const Stack = createNativeStackNavigator<VoucherStackParamList>();

type Props = {};

const VoucherStack = (_: Props) => {
  return (
    <Stack.Navigator
      initialRouteName="VoucherListScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="VoucherListScreen" component={VoucherListScreen} />
      <Stack.Screen name="CreateVoucherStack" component={CreateVoucherStack} />
      <Stack.Screen name="UpdateVoucherStack" component={UpdateVoucherStack} />
    </Stack.Navigator>
  );
};

export default VoucherStack;
