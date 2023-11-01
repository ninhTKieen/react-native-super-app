import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {yupResolver} from '@hookform/resolvers/yup';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';

export const usePromotionCreateValidator = () => {
  const {t} = useTranslation();
  const promotionCreateSchema = yup
    .object({
      tenantId: yup.number().nullable().notRequired(),
      providerId: yup.number().nullable().required(),
      type: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      scope: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      descriptions: yup.string().nullable().notRequired(),
      discountType: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      voucherCode: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      name: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      quantity: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      minBasketPrice: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      maxPrice: yup.number().when('discountType', {
        is: 2,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      }),
      percentage: yup.number().when('discountType', {
        is: 2,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      }),

      discountAmount: yup.number().when('discountType', {
        is: 1,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      }),
      dateStart: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      dateEnd: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      isAdminCreated: yup.boolean().nullable().notRequired(),
      maxDistributionBuyer: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      //list of id number
      listItems: yup.array().of(yup.number()).required().min(0),
    })
    .required();

  return yupResolver(promotionCreateSchema);
};

// quantity: number;
// minBasketPrice: number;
// maxPrice: number;
// percentage?: number;
// discountAmount: number;
// dateStart: string;
// dateEnd: string;
// maxDistributionBuyer: number;
export const useVoucherUpdateValidator = () => {
  const {t} = useTranslation();
  const voucherUpdateSchema = yup
    .object({
      id: yup.number().required(),
      descriptions: yup.string().nullable().notRequired(),
      name: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      quantity: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      minBasketPrice: yup.number().required().nullable(),
      maxPrice: yup.number().when('discountType', {
        is: 2,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
          .nullable(),
      }),
      percentage: yup.number().when('discountType', {
        is: 2,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
          .nullable(),
      }),
      discountAmount: yup.number().when('discountType', {
        is: 1,
        then: yup
          .number()
          .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
          .nullable(),
      }),
      dateStart: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      dateEnd: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      maxDistributionBuyer: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
    })
    .required();

  return yupResolver(voucherUpdateSchema);
};
