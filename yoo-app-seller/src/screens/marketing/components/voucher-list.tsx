import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import {IVoucher} from '@/features/voucher/voucher.model';
import VoucherItemIncoming from './voucher-incoming-item';
import VoucherItemOngoing from './voucher-ongoing-item';
import VoucherItemExpired from './voucher-expired-item';
import {Divider} from 'react-native-paper';

const {height} = Dimensions.get('screen');

type Props = {
  data: IVoucher[];
  type: 'incoming' | 'ongoing' | 'expired';
};

const RenderItem = ({
  item,
  index,
  type,
}: {
  item: IVoucher;
  index: number;
  type: 'incoming' | 'ongoing' | 'expired';
}): JSX.Element => {
  if (type === 'incoming') {
    return <VoucherItemIncoming key={index} item={item} />;
  } else if (type === 'ongoing') {
    return <VoucherItemOngoing key={index} item={item} />;
  } else if (type === 'expired') {
    return <VoucherItemExpired key={index} item={item} />;
  } else {
    return <View />;
  }
};

const Separator = () => {
  return <Divider />;
};

const VoucherList = ({data, type}: Props) => {
  const {t} = useTranslation();

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <View
          style={{
            height: height * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconGeneral
            type="FontAwesome5"
            name="ticket-alt"
            size={56}
            color={'#ced4da'}
          />
          <Text style={{fontSize: 16, fontWeight: '500', color: '#adb5bd'}}>
            {t(i18nKeys.voucher.noVoucher)}
          </Text>
        </View>
      }
      renderItem={({item, index}) => (
        <RenderItem item={item} index={index} type={type} />
      )}
    />
  );
};

export default VoucherList;

const styles = StyleSheet.create({
  container: {},
});
