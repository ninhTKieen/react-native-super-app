import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';

type Props = {};

const FlashSaleListScreen = (props: Props) => {
  return (
    <View>
      <TopBar title="Flash Sale" />
      <Text>FlashSaleListScreen</Text>
    </View>
  );
};

export default FlashSaleListScreen;

const styles = StyleSheet.create({});
