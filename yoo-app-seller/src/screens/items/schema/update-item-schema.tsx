import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

const useUpdateItemSchema = () => {
  const {t} = useTranslation();

  return yup
    .object({
      tenantId: yup.number().default(0),
      name: yup
        .string()
        .required(t(i18nKeys.item.create.errors.emptyName) as string),
      providerId: yup.number().default(1),
      categoryId: yup
        .number()
        .required(t(i18nKeys.item.create.errors.emptyCategory) as string),
      sku: yup.string().default(''),
      imageUrlList: yup
        .array()
        .min(1, t(i18nKeys.item.create.errors.emptyImages) as string)
        .required(),
      videoUrlList: yup.array().of(yup.string().required()).default([]),
      description: yup
        .string()
        .required(t(i18nKeys.item.create.errors.emptyDescription) as string),
      sizeInfo: yup.string().default(''),
      logisticInfo: yup.string().default(''),
      status: yup.number().default(1),
      condition: yup.number().default(1),
      complaintPolicy: yup.string().default(''),
      attributeList: yup
        .array()
        .of(
          yup.object().shape({
            id: yup.number().required(),
            valueList: yup.array().of(yup.string()).required(),
            unitList: yup.array().of(yup.string()),
          }),
        )
        .default([]),
      tierVariationList: yup
        .array()
        .of(
          yup.object().shape({
            name: yup.string().required(),
            optionList: yup
              .array()
              .of(yup.string().required())
              .required()
              .min(1),
          }),
        )
        .max(2)
        .default([]),
      modelList: yup
        .array()
        .of(
          yup
            .object()
            .shape({
              id: yup.number().required(),
              sku: yup.string().default(''),
              stock: yup
                .number()
                .required(t(i18nKeys.item.create.errors.emptyStock) as string),
              originalPrice: yup.number().required(),
              currentPrice: yup
                .number()
                .required(t(i18nKeys.item.create.errors.emptyPrice) as string),
              tierIndex: yup.array().of(yup.number()).max(2).default([]),
              imageUrl: yup.string().default(''),
              sales: yup.number().default(0),
              isDeleted: yup.boolean().default(false),
              deletionTime: yup.string().default(''),
              deleteUserId: yup.number().default(0),
            })
            .required(),
        )
        .min(1, t(i18nKeys.item.create.errors.emptyField) as string)
        .required(t(i18nKeys.item.create.errors.emptyField) as string),
    })
    .required();
};

export default useUpdateItemSchema;
