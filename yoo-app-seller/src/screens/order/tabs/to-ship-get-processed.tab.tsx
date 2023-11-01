import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListOrder from '../components/list-order';
import {OrderFormId} from '@/features/order/order.model';

const ToShipGetProcessedTab = () => {
  return (
    <View style={styles.container}>
      <ListOrder formId={OrderFormId.TO_SHIP_PROCESSED} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ToShipGetProcessedTab;
