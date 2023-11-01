import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const useStoreCreateValidator = () => {
  const {t} = useTranslation();
  const storeCreateSchema = yup
    .object({
      name: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      email: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          t(i18nKeys.common.errEmail) as string,
        ),
      contact: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      description: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      phoneNumber: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          t(i18nKeys.common.errPhoneNumber) as string,
        ),
      groupType: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      imageUrls: yup
        .array()
        .of(yup.string())
        .min(1, t(i18nKeys.store.createForm.requiredFieldImage) as string)
        .required(t(i18nKeys.store.createForm.requiredFieldImage) as string),
      latitude: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      longitude: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      properties: yup.string(),
      districtId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      provinceId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      wardId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      businessInfo: yup.string(),
      address: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      workTime: yup.string(),
      ownerId: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      type: yup.number().notRequired(),
    })
    .required();
  return yupResolver(storeCreateSchema);
};

export const useStoreUpdateValidator = () => {
  const {t} = useTranslation();
  const storeUpdateSchema = yup
    .object({
      name: yup
        .string()
        .nullable()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string),
      email: yup
        .string()
        .nullable()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          t(i18nKeys.common.errEmail) as string,
        ),
      contact: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      description: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      phoneNumber: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable()
        .matches(
          /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
          t(i18nKeys.common.errPhoneNumber) as string,
        ),
      groupType: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      type: yup
        .number()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      imageUrls: yup
        .array()
        .of(yup.string())
        .required(t(i18nKeys.store.createForm.requiredFieldImage) as string)
        .nullable(),
      latitude: yup.number().required().nullable(),
      longitude: yup.number().required().nullable(),
      properties: yup.string().notRequired().nullable(),
      districtId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      provinceId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      wardId: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      businessInfo: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      address: yup
        .string()
        .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
        .nullable(),
      workTime: yup.string().notRequired().nullable(),
      ownerId: yup.number().notRequired().nullable(),
    })
    .required();

  return yupResolver(storeUpdateSchema);
};
