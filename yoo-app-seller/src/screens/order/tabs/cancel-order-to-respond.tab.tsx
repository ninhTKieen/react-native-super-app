import React from 'react';
import {View, StyleSheet} from 'react-native';
import ListOrder from '../components/list-order';
import {OrderFormId} from '@/features/order/order.model';

const CancelOrderToRespondTab = () => {
  return (
    <View style={styles.container}>
      <ListOrder formId={OrderFormId.CANCELLATION_TO_RESPOND} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CancelOrderToRespondTab;
