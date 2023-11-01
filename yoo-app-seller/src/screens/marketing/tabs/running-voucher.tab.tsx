import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {VoucherTabParamList} from '@/routes/marketing.route';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import VoucherList from '../components/voucher-list';
import voucherService from '@/features/voucher/voucher.service';
import {useCurrentStore} from '@/hooks/useCurrentStore';
import {useQuery} from '@tanstack/react-query';

type Props = MaterialTopTabScreenProps<VoucherTabParamList, 'RunningVoucher'>;

const RunningVoucherTab = ({}: Props) => {
  const {currentStoreInfor} = useCurrentStore();
  const {data, isLoading} = useQuery(['vouchers', '21'], {
    queryFn: () =>
      voucherService.getAllVouchers({
        formId: 21,
        providerId: currentStoreInfor?.id,
      }),
  });

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <VoucherList data={data} type="ongoing" />
      )}
    </View>
  );
};

export default RunningVoucherTab;
