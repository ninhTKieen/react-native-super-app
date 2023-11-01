import {View} from 'react-native';
import React from 'react';
import {VoucherTabParamList} from '@/routes/marketing.route';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import VoucherList from '../components/voucher-list';
import {useQuery} from '@tanstack/react-query';
import voucherService from '@/features/voucher/voucher.service';
import {useCurrentStore} from '@/hooks/useCurrentStore';
import {ActivityIndicator} from 'react-native-paper';

type Props = MaterialTopTabScreenProps<VoucherTabParamList, 'ExpiredVoucher'>;

const ExpiredVoucherTab = ({}: Props) => {
  const {currentStoreInfor} = useCurrentStore();
  const {data, isLoading} = useQuery(['vouchers', '23'], {
    queryFn: () =>
      voucherService.getAllVouchers({
        formId: 23,
        providerId: currentStoreInfor?.id,
      }),
  });

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <VoucherList data={data} type="expired" />
      )}
    </View>
  );
};

export default ExpiredVoucherTab;
