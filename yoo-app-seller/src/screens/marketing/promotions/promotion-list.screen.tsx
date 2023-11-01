import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';

type Props = {};

const PromotionListScreen = (props: Props) => {
  return (
    <View>
      <TopBar title="Promotion" />
      <Text>VoucherListScreen</Text>
    </View>
  );
};

export default PromotionListScreen;

const styles = StyleSheet.create({});
