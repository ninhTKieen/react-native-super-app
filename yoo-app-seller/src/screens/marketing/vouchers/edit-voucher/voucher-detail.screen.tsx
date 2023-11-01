import TopBar from '@/components/top-bar';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {IVoucherUpdate} from '@/features/voucher/voucher.model';
import {
  UpdateVoucherStackParamList,
  VOUCHER_DETAIL_SCREEN_TYPE,
  VoucherStackParamList,
} from '@/routes/marketing.route';
import {useVoucherUpdateValidator} from '@/validators/voucher/voucher.validator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Divider, TextInput} from 'react-native-paper';
import {
  SettingPromotionAmount,
  SettingPromotionPercent,
} from '../../components/setting-voucher';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '@/configs/globalStyles';
import ButtonWithLayout from '../../components/button-with-layout';
import RNDatePickerModal from '@/components/modals/rn-date-picker-modal';
import moment from 'moment';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import voucherService from '@/features/voucher/voucher.service';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import Toast from 'react-native-toast-message';
import IconGeneral from '@/components/common/icon-general';

type Props = NativeStackScreenProps<
  UpdateVoucherStackParamList,
  'UpdateVoucherScreen'
>;

const width = Dimensions.get('screen').width;

const UpdateVoucherScreen = ({route: {params}, navigation}: Props) => {
  const {showStyle, voucherInfo} = params;
  const [type, setType] = React.useState<number>(voucherInfo.discountType);
  const [visibleDatePicker1, setVisibleDatePicker1] = useState(false);
  const [visibleDatePicker2, setVisibleDatePicker2] = useState(false);
  const queryClient = useQueryClient();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const {t} = useTranslation();

  // const methods = useForm<IVoucherUpdate>({
  //   resolver: useVoucherUpdateValidator(),
  //   defaultValues: {
  //     name: voucherInfo.name,
  //     dateStart: voucherInfo.dateStart,
  //     dateEnd: voucherInfo.dateEnd,
  //     descriptions: voucherInfo.descriptions || '',
  //     maxPrice: voucherInfo.maxPrice,
  //     percentage: voucherInfo.percentage,
  //     id: voucherInfo.id,
  //     discountAmount: voucherInfo.discountAmount,
  //     maxDistributionBuyer: voucherInfo.maxDistributionBuyer,
  //     quantity: voucherInfo.quantity,
  //     minBasketPrice: voucherInfo.minBasketPrice,
  //   },
  // });

  // const {setValue, watch, handleSubmit} = methods;
  const {setValue, watch, handleSubmit, getValues, getFieldState} =
    useFormContext<IVoucherUpdate>();
  const onSubmit = () => {
    setValue(
      'dateStart',
      moment(watch('dateStart'), 'MM/DD/YYYY hh:mm:ss').toISOString(),
    );
    setValue(
      'dateEnd',
      moment(watch('dateEnd'), 'MM/DD/YYYY hh:mm:ss').toISOString(),
    );
    updateVoucher();
  };

  const onError = () => {};

  const {mutate: updateVoucher} = useMutation({
    mutationFn: () => voucherService.updateVoucher(getValues()),
    onSuccess: () => {
      showStyle === VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
        ? queryClient.refetchQueries(['vouchers', '22'])
        : queryClient.refetchQueries(['vouchers', '21']);

      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.voucher.update.success) as string,
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.voucher.update.error) as string,
      });
    },
    onSettled: () => {
      closeModal('LoadingModal');
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
  });

  return (
    <View>
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <TopBar title={t(i18nKeys.voucher.update.title)} />
          <ScrollView style={styles.body}>
            <View style={[styles.section, {}]}>
              <Text style={styles.text_header}>
                {t(i18nKeys.voucher.detail.name)}
              </Text>
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                }}>
                <TextInput
                  disabled={
                    VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                  }
                  style={{backgroundColor: '#fff', padding: 0}}
                  outlineStyle={{borderRadius: 2}}
                  mode="flat"
                  activeUnderlineColor={color.blue1}
                  onChangeText={text => setValue('name', text)}
                  value={watch('name')}
                />
                {getFieldState('name').error && (
                  <Text style={{color: 'red', paddingTop: 10}}>
                    {getFieldState('name').error?.message}
                  </Text>
                )}
              </View>
            </View>

            <View style={[styles.section, {opacity: 0.7}]}>
              <Text style={styles.text_header}>Phân loại mã</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  paddingTop: '2%',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={[
                    styles.buttonScope,
                    {
                      borderColor: watch('type') === 1 ? '#75A3C7' : '#adb5bd',
                    },
                  ]}>
                  <Text style={styles.txtScope}>Voucher vận chuyển</Text>
                  <View
                    style={{
                      height: '100%',
                    }}>
                    <View
                      style={[
                        styles.iconCheck,
                        {
                          backgroundColor:
                            watch('type') === 1 ? '#75A3C7' : '#adb5bd',
                        },
                      ]}>
                      <IconGeneral
                        type="Ionicons"
                        name="checkmark"
                        size={18}
                        color={'#FFF'}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={true}
                  style={[
                    styles.buttonScope,
                    {
                      borderColor: watch('type') === 2 ? '#75A3C7' : '#adb5bd',
                    },
                  ]}>
                  <Text style={styles.txtScope}>Voucher bán hàng</Text>
                  <View
                    style={{
                      height: '100%',
                    }}>
                    <View
                      style={[
                        styles.iconCheck,
                        {
                          backgroundColor:
                            watch('type') === 2 ? '#75A3C7' : '#adb5bd',
                        },
                      ]}>
                      <IconGeneral
                        type="Ionicons"
                        name="checkmark"
                        size={18}
                        color={'#FFF'}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.text_header}>
                {t(i18nKeys.voucher.detail.setting)}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 18,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <ButtonWithLayout
                  disabled={true}
                  onPress={() => {}}
                  label={t(i18nKeys.voucher.detail.amount)}
                  isFocused={type === 1}
                />
                <ButtonWithLayout
                  disabled={true}
                  onPress={() => {}}
                  label={t(i18nKeys.voucher.detail.percent)}
                  isFocused={type !== 1}
                />
              </View>

              {type === 1 ? (
                <SettingPromotionAmount
                  style={showStyle}
                  expired={
                    VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                  }
                />
              ) : (
                <SettingPromotionPercent
                  style={showStyle}
                  expired={
                    VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                  }
                />
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.text_header}>
                {t(i18nKeys.voucher.detail.time)}
              </Text>
              <Divider style={{marginTop: 10}} />
              <View style={styles.item}>
                <Text>{t(i18nKeys.voucher.detail.start)}</Text>
                <TouchableOpacity
                  style={styles.sub_item}
                  disabled={
                    VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING !== showStyle
                  }
                  onPress={() => setVisibleDatePicker1(true)}>
                  <Text
                    style={{
                      color:
                        VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING !== showStyle
                          ? color.grey6
                          : color.blueDark,
                    }}>
                    {watch('dateStart').slice(0, 16)}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={18}
                    color={
                      VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING !== showStyle
                        ? color.grey6
                        : color.blueDark
                    }
                  />
                </TouchableOpacity>
              </View>

              <Divider style={{marginTop: 10}} />

              <View style={styles.item}>
                <Text>{t(i18nKeys.voucher.detail.end)}</Text>
                <TouchableOpacity
                  style={styles.sub_item}
                  disabled={
                    VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                  }
                  onPress={() => setVisibleDatePicker2(true)}>
                  <Text
                    style={{
                      color:
                        VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                          ? color.grey6
                          : color.blueDark,
                    }}>
                    {watch('dateEnd').slice(0, 16)}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={18}
                    color={
                      VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT === showStyle
                        ? color.grey6
                        : color.blueDark
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.section]}>
              <Text style={[styles.text_header, {opacity: 0.5}]}>
                {t(i18nKeys.voucher.detail.code)}
              </Text>
              <TextInput
                value={voucherInfo.voucherCode}
                theme={{colors: {text: color.blueDark1}}}
                textColor={color.grey6}
                mode="flat"
                editable={false}
                underlineStyle={{
                  height: 0,
                }}
                contentStyle={{paddingHorizontal: 0, opacity: 0.5}}
                activeUnderlineColor={color.blue1}
                style={styles.code}
              />
            </View>
          </ScrollView>
        </View>
        <View style={[styles.section, {opacity: 0.7}]}>
          <Text style={styles.text_header}>Loại mã</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingTop: '2%',
            }}>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.buttonScope,
                {
                  borderColor: watch('scope') === 1 ? '#75A3C7' : '#adb5bd',
                },
              ]}>
              <Text style={styles.txtScope}>Voucher toàn shop</Text>
              <View
                style={{
                  height: '100%',
                }}>
                <View
                  style={[
                    styles.iconCheck,
                    {
                      backgroundColor:
                        watch('scope') === 1 ? '#75A3C7' : '#adb5bd',
                    },
                  ]}>
                  <IconGeneral
                    type="Ionicons"
                    name="checkmark"
                    size={18}
                    color={'#FFF'}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={true}
              style={[
                styles.buttonScope,
                {
                  borderColor: watch('scope') === 2 ? '#75A3C7' : '#adb5bd',
                },
              ]}>
              <Text style={styles.txtScope}>Voucher sản phẩm</Text>
              <View
                style={{
                  height: '100%',
                }}>
                <View
                  style={[
                    styles.iconCheck,
                    {
                      backgroundColor:
                        watch('scope') === 2 ? '#75A3C7' : '#adb5bd',
                    },
                  ]}>
                  <IconGeneral
                    type="Ionicons"
                    name="checkmark"
                    size={18}
                    color={'#FFF'}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {watch('scope') === 2 && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdateChooseItem', {
                showStyle: showStyle,
                voucherInfo: voucherInfo,
              });
            }}
            style={[
              styles.section,
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text>Áp dụng cho nhóm sản phẩm</Text>
            <Text>{watch('listItems').length + ' sản phẩm'}</Text>
          </TouchableOpacity>
        )}
        {VOUCHER_DETAIL_SCREEN_TYPE.DISABLE_EDIT !== showStyle && (
          <Button
            onPress={handleSubmit(onSubmit, onError)}
            style={styles.create}
            labelStyle={{color: '#fff'}}>
            {t(i18nKeys.common.update)}
          </Button>
        )}
      </KeyboardAwareScrollView>

      <RNDatePickerModal
        defaultValue={moment(
          watch('dateStart'),
          'MM/DD/YYYY hh:mm:ss',
        ).toDate()}
        modalStatus={visibleDatePicker1}
        setModalStatus={setVisibleDatePicker1}
        mode="datetime"
        onChange={(date: string) =>
          setValue('dateStart', moment(date).format('MM/DD/YYYY hh:mm:ss'))
        }
        minDate={new Date()}
        maxDate={new Date(2100, 0, 1)}
      />
      <RNDatePickerModal
        defaultValue={moment(watch('dateEnd'), 'MM/DD/YYYY hh:mm:ss').toDate()}
        modalStatus={visibleDatePicker2}
        setModalStatus={setVisibleDatePicker2}
        mode="datetime"
        onChange={(date: string) =>
          setValue('dateEnd', moment(date).format('MM/DD/YYYY hh:mm:ss'))
        }
        minDate={new Date()}
        maxDate={new Date(2100, 0, 1)}
      />
    </View>
  );
};

export default UpdateVoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {},
  section: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 15,
  },
  text_header: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#dfe6e9',
    padding: 10,
    width: '46%',
    marginHorizontal: 5,
    alignContent: 'center',
  },
  selected_button: {
    backgroundColor: '#fff',
    borderColor: '#0984e3',
    borderWidth: 2,
  },
  text: {
    textAlign: 'center',
  },
  selected_text: {
    color: '#0984e3',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 10,
  },
  sub_item: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '50%',
  },
  code: {
    paddingHorizontal: 2,
    height: 40,
    backgroundColor: color.grey7,
    textAlign: 'center',
    borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 15,
  },
  create: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: color.blue1,
    marginTop: 10,
  },
  buttonScope: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 2,
  },
  iconCheck: {
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  txtScope: {
    paddingVertical: '3%',
    paddingLeft: '2%',
    paddingRight: '1%',
  },
});
