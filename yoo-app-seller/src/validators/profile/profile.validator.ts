import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const useUpdateProfileValidator = () => {
  const {t} = useTranslation();
  const updateProfileSchema = yup
    .object({
      name: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      surname: yup
        .string()
        .notRequired()
        .nullable()
        // .transform(value => (!!value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      emailAddress: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      phoneNumber: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      homeAddress: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      dateOfBirth: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      gender: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      nationality: yup
        .string()
        .notRequired()
        .nullable()
        .transform(value => (value ? value : null))
        .min(2, t(i18nKeys.profile.error.min2) as never),
      userName: yup.string().notRequired().nullable(),
      imageUrl: yup.string().notRequired().nullable(),
    })
    .required();
  return yupResolver(updateProfileSchema);
};

export const useUpdatePasswordValidator = () => {
  const {t} = useTranslation();
  const updatePasswordSchema = yup
    .object({
      currentPassword: yup
        .string()
        .required(t(i18nKeys.profile.error.required) as never),
      newPassword: yup
        .string()
        .required(t(i18nKeys.profile.error.required) as never),
      confirmPassword: yup
        .string()
        .required(t(i18nKeys.profile.error.required) as never)
        .equals(
          [yup.ref('newPassword')],
          t(i18nKeys.profile.error.passwordMatch) as never,
        ),
    })
    .required();
  return yupResolver(updatePasswordSchema);
};
