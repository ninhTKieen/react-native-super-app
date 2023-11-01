import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListOrder from '../components/list-order';
import {OrderFormId} from '@/features/order/order.model';

const CancelOrderGetAllTab = () => {
  return (
    <View style={styles.container}>
      <ListOrder formId={OrderFormId.CANCELLATION_GET_ALL} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CancelOrderGetAllTab;
