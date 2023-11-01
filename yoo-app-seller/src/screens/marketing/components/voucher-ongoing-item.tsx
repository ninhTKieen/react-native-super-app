import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {color} from '@/configs/globalStyles';
import IconGeneral from '@/components/common/icon-general';
import {MarketingIcon} from './icons';
import ImageCustomer from '@/components/common/image-customer';
import {IVoucher} from '@/features/voucher/voucher.model';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import voucherService from '@/features/voucher/voucher.service';
import Toast from 'react-native-toast-message';
import ConfirmModal from '@/components/modals/confirm-modal';
import {
  VOUCHER_DETAIL_SCREEN_TYPE,
  VoucherStackParamList,
} from '@/routes/marketing.route';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  item: IVoucher;
};

const VoucherItemOngoing = ({item}: Props) => {
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = React.useState(false);
  const navigation = useNavigation<NavigationProp<VoucherStackParamList>>();

  const {mutate: endVoucher} = useMutation({
    mutationFn: () => voucherService.endVoucher({id: item.id}),
    onSuccess: () => {
      queryClient.refetchQueries(['vouchers', '21']);
      queryClient.refetchQueries(['vouchers', '23']);
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.voucher.endSuccess) as string,
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.voucher.endFail) as string,
      });
    },
    onSettled: () => {
      closeModal('LoadingModal');
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
  });
  const start: string = item.dateStart;
  const end: string = item.dateEnd;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_left}>
          <ImageCustomer
            style={{height: 90, width: 90}}
            source={require('@/assets/marketing/images/voucher.png')}
          />
          <View style={styles.group_text}>
            <Text style={styles.text1}>
              {start.slice(0, 10) + ' - ' + end.slice(0, 10)}
            </Text>
            <Text style={styles.text2}>
              {t(i18nKeys.voucher.detail.min) +
                ' ' +
                item?.minBasketPrice.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
            </Text>
            {item?.discountType === 1 ? (
              <Text style={styles.text3}>
                {item?.discountAmount.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }) +
                  ' ' +
                  t(i18nKeys.voucher.discount)}
              </Text>
            ) : (
              <Text style={styles.text3}>
                {item?.percentage +
                  t(i18nKeys.voucher.suffix2) +
                  ' ' +
                  t(i18nKeys.voucher.discount)}
              </Text>
            )}
          </View>
        </View>
        <View>
          <Text style={styles.header_right_text}>
            {t(i18nKeys.voucher.ongoing)}
          </Text>
        </View>
      </View>

      <View style={styles.status}>
        <View style={styles.status_group_text}>
          <IconGeneral
            type="MaterialCommunityIcons"
            name={'clipboard-check-multiple-outline'}
            size={20}
            style={styles.status_icon}
          />
          <Text style={styles.status_text1}>
            {t(i18nKeys.voucher.detail.used) + ': ' + item?.listUser.length}
          </Text>
        </View>

        <View style={[styles.status_group_text, {paddingLeft: 50}]}>
          <MarketingIcon.Download height={20} width={20} />
          <Text style={styles.status_text2}>
            {t(i18nKeys.voucher.detail.maxUsed) + ': ' + item?.quantity}
          </Text>
        </View>
      </View>

      <View style={styles.action}>
        <View style={styles.button_wrapper}>
          <Button
            style={styles.button}
            textColor={color.blueDark1}
            onPress={() =>
              navigation.navigate('UpdateVoucherStack', {
                screen: 'UpdateVoucherScreen',
                params: {
                  showStyle: VOUCHER_DETAIL_SCREEN_TYPE.EDIT_RUNNING,
                  voucherInfo: item,
                },
              })
            }>
            {t(i18nKeys.common.edit)}
          </Button>
        </View>
        <View style={styles.button_wrapper}>
          <Button
            style={styles.button}
            textColor={color.blueDark1}
            onPress={() => setIsVisibleDeleteModal(true)}>
            {t(i18nKeys.voucher.endVoucher)}
          </Button>
        </View>
      </View>
      <ConfirmModal
        isVisible={isVisibleDeleteModal}
        message={t(i18nKeys.voucher.confirmEnd)}
        onPressCancel={() => setIsVisibleDeleteModal(false)}
        onPressConfirm={() => {
          endVoucher();
        }}
        setVisible={setIsVisibleDeleteModal}
      />
    </View>
  );
};

export default VoucherItemOngoing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  header_left: {
    flexDirection: 'row',
  },
  group_text: {
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  text1: {
    fontWeight: '600',
    fontSize: 15,
  },
  text2: {
    fontSize: 15,
  },
  text3: {
    fontSize: 20,
    color: color.blueDark1,
  },
  header_right_text: {
    fontSize: 12,
    backgroundColor: color.green1,
    paddingHorizontal: 2,
    color: '#fff',
  },
  status: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  status_group_text: {
    flexDirection: 'row',
    paddingRight: 20,
    alignItems: 'center',
  },
  status_text1: {
    fontSize: 12,
    paddingLeft: 15,
    color: color.grey6,
  },
  status_text2: {
    fontSize: 12,
    paddingLeft: 15,
    color: color.grey6,
  },
  status_icon: {
    color: color.grey6,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: color.blueDark1,
  },
  button_wrapper: {
    width: '48%',
  },
});
