import {View} from 'react-native';
import React from 'react';
import ListOrder from '../components/list-order';
import {OrderTabParamList} from '@/routes/order.route';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
type Props = MaterialTopTabScreenProps<OrderTabParamList, 'ShippingOrder'>;

const ShippingOrderTab = ({route}: Props) => {
  return (
    <View>
      <ListOrder formId={route.params.formId} />
    </View>
  );
};

export default ShippingOrderTab;
