import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const useAdValidator = () => {
  const {t} = useTranslation();

  return yup
    .object({
      tenantId: yup.number().default(0),
      link: yup.string().default(''),
      imageUrl: yup
        .mixed()
        .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
      descriptions: yup
        .string()
        .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
      providerId: yup.number().default(0),
      itemId: yup
        .number()
        .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
      categoryId: yup
        .number()
        .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
      typeBusiness: yup
        .number()
        .required(`${t(i18nKeys.common.errThisFieldIsRequired)}`),
    })
    .required();
};
