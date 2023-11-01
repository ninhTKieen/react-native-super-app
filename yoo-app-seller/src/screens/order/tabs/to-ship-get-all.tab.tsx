import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListOrder from '../components/list-order';
import {OrderFormId} from '@/features/order/order.model';

const ToShipGetAllTab = () => {
  return (
    <View style={styles.container}>
      <ListOrder formId={OrderFormId.TO_SHIP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ToShipGetAllTab;
