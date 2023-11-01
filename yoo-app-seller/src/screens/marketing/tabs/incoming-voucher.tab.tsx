import {ActivityIndicator, View} from 'react-native';
import React from 'react';
import {VoucherTabParamList} from '@/routes/marketing.route';
import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import VoucherList from '../components/voucher-list';
import {useQuery} from '@tanstack/react-query';
import voucherService from '@/features/voucher/voucher.service';
import {useCurrentStore} from '@/hooks/useCurrentStore';

type Props = MaterialTopTabScreenProps<VoucherTabParamList, 'IncomingVoucher'>;

const IncomingPromotionTab = ({}: Props) => {
  const {currentStoreInfor} = useCurrentStore();
  const {data, isLoading} = useQuery(['vouchers', '22'], {
    queryFn: () =>
      voucherService.getAllVouchers({
        formId: 22,
        providerId: currentStoreInfor?.id,
      }),
  });

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <VoucherList data={data} type="incoming" />
      )}
    </View>
  );
};

export default IncomingPromotionTab;
