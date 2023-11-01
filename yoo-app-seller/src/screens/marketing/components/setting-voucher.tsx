import React from 'react';
import {View} from 'react-native';
import {Divider} from 'react-native-paper';
import VoucherInputItem from './voucher-input-item';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useFormContext} from 'react-hook-form';
import {IVoucherCreate, IVoucherUpdate} from '@/features/voucher/voucher.model';
import {VOUCHER_DETAIL_SCREEN_TYPE} from '@/routes/marketing.route';

type Props = {
  style?: number;
  expired?: boolean;
};

const SettingPromotionAmount = ({style, expired}: Props) => {
  const {control} = useFormContext<IVoucherCreate>();
  const {t} = useTranslation();

  if (style) {
    return (
      <EditSettingPromotionAmount disabled={expired === true} style={style} />
    );
  }

  return (
    <View>
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.amount)}
        name="discountAmount"
        pressable={false}
        suffix=" đ"
        control={control}
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.min)}
        name="minBasketPrice"
        pressable={false}
        suffix=" đ"
        control={control}
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.quantity)}
        name="quantity"
        pressable={true}
        control={control}
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.quantityPerUser)}
        name="maxDistributionBuyer"
        pressable={true}
        control={control}
      />
    </View>
  );
};

const EditSettingPromotionAmount = ({
  style,
  disabled,
}: {
  disabled: boolean;
  style: number;
}) => {
  const {control} = useFormContext<IVoucherUpdate>();
  const {t} = useTranslation();

  return (
    <View>
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.amount)}
        name="discountAmount"
        pressable={false}
        suffix=" đ"
        control={control}
        disabled={
          disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
        }
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.min)}
        name="minBasketPrice"
        pressable={false}
        suffix=" đ"
        control={control}
        disabled={
          disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
        }
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.quantity)}
        name="quantity"
        pressable={true}
        control={control}
        disabled={
          disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
        }
      />
      <Divider />
      <VoucherInputItem
        label={t(i18nKeys.voucher.detail.quantityPerUser)}
        name="maxDistributionBuyer"
        pressable={true}
        control={control}
        disabled={disabled}
      />
    </View>
  );
};

const SettingPromotionPercent = ({style, expired}: Props) => {
  const {t} = useTranslation();
  const {control} = useFormContext<IVoucherCreate>();

  if (style) {
    return (
      <EditSettingPromotionPercent disabled={expired === true} style={style} />
    );
  }

  return (
    <View>
      <View>
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.percent)}
          name="percentage"
          pressable={false}
          suffix=" %"
          control={control}
        />
        <Divider />
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.min)}
          name="minBasketPrice"
          pressable={false}
          suffix=" đ"
          control={control}
        />

        <Divider />

        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.max)}
          name="maxPrice"
          pressable={false}
          suffix=" đ"
          control={control}
        />

        <Divider />
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.quantity)}
          name="quantity"
          pressable={true}
          control={control}
        />

        <Divider />

        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.quantityPerUser)}
          name="maxDistributionBuyer"
          pressable={true}
          control={control}
        />
      </View>
    </View>
  );
};

const EditSettingPromotionPercent = ({
  disabled,
  style,
}: {
  disabled: boolean;
  style: number;
}) => {
  const {t} = useTranslation();
  const {control} = useFormContext<IVoucherUpdate>();

  return (
    <View>
      <View>
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.percent)}
          name="percentage"
          pressable={false}
          suffix=" %"
          control={control}
          disabled={
            disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
          }
        />
        <Divider />
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.min)}
          name="minBasketPrice"
          pressable={false}
          suffix=" đ"
          control={control}
          disabled={
            disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
          }
        />

        <Divider />

        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.max)}
          name="maxPrice"
          pressable={false}
          suffix=" đ"
          control={control}
          disabled={
            disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
          }
        />

        <Divider />
        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.quantity)}
          name="quantity"
          pressable={true}
          control={control}
          disabled={
            disabled || style !== VOUCHER_DETAIL_SCREEN_TYPE.EDIT_INCOMING
          }
        />

        <Divider />

        <VoucherInputItem
          label={t(i18nKeys.voucher.detail.quantityPerUser)}
          name="maxDistributionBuyer"
          pressable={true}
          control={control}
          disabled={disabled}
        />
      </View>
    </View>
  );
};

export {SettingPromotionAmount, SettingPromotionPercent};
