import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const ITEM_BOOKING_TYPE = {
  MEDICAL: [24, 2401, 2402, 2403, 2404, 2405, 2406, 2407],
  SPORT: [25, 2501, 2502, 2503, 2504, 2505, 2506, 2507, 2508],
  CUISINE: [12, 1201, 1202, 1203, 1204],
  ACCOMMODATION: [33, 3301, 3302, 3303, 3304, 3305, 3306],
};

export const useItemBookingSchema = ({typeStore}: {typeStore: number}) => {
  const {t} = useTranslation();

  return yup
    .object({
      tenantId: yup.number().default(0),
      name: yup
        .string()
        .required(t(i18nKeys.itemBooking.create.errors.emptyName) as string),
      providerId: yup.number().default(1),
      imageUrlList: yup
        .array()
        .min(1, t(i18nKeys.itemBooking.create.errors.emptyImages) as string)
        .required(),
      videoUrlList: yup.array().of(yup.string().required()).default([]),
      description: yup
        .string()
        .required(
          t(i18nKeys.itemBooking.create.errors.emptyDescription) as string,
        ),
      type: yup.number().default(typeStore),
      properties: yup
        .object()
        .when('type', {
          is: (val: any) => ITEM_BOOKING_TYPE.SPORT.includes(val),
          then: yup.object().shape({
            name: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            type: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            phoneNumber: yup
              .string()
              .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
              .matches(
                /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
                t(i18nKeys.common.errPhoneNumber) as string,
              ),
            address: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            timeFrames: yup
              .array()
              .of(
                yup.object().shape({
                  timeFrom: yup
                    .string()
                    .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
                  timeTo: yup
                    .string()
                    .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
                  price: yup
                    .number()
                    .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
                }),
              )
              .min(1)
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            priceHour: yup
              .number()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
          }),
          otherwise: yup.object().notRequired(),
        })
        .when('type', {
          is: (val: any) => ITEM_BOOKING_TYPE.CUISINE.includes(val),
          then: yup.object().shape({
            phoneNumber: yup
              .string()
              .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
              .matches(
                /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
                t(i18nKeys.common.errPhoneNumber) as string,
              ),
            otherContacts: yup.string().notRequired(),
            address: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            peoplePerTable: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
          }),
        })
        .when('type', {
          is: (val: any) => ITEM_BOOKING_TYPE.ACCOMMODATION.includes(val),
          then: yup.object().shape({
            phoneNumber: yup
              .string()
              .required(t(i18nKeys.common.errThisFieldIsRequired) as string)
              .matches(
                /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
                t(i18nKeys.common.errPhoneNumber) as string,
              ),
            otherContacts: yup.string().notRequired(),
            address: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            peoplePerRoom: yup
              .string()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            acreage: yup
              .number()
              .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
            inforOther: yup.object().shape({
              priceElectric: yup.string(),
              priceWater: yup.string(),
              priceOther: yup.string(),
            }),
          }),
        }),
      itemModel: yup
        .object({
          originalPrice: yup.number().required().default(0),
          currentPrice: yup
            .number()
            .required(
              t(i18nKeys.itemBooking.create.errors.emptyPrice) as string,
            ),
          imageUrl: yup.string().default(''),
        })
        .required(t(i18nKeys.itemBooking.create.errors.emptyPrice) as string),
    })
    .required();
};
