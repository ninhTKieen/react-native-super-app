import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

export const useRegisterValidator = () => {
  const {t} = useTranslation();
  const errorMessages = t(i18nKeys.auth.register.requiredField) as never;
  const registerSchema = yup
    .object({
      name: yup.string().required(errorMessages),
      surname: yup.string().required(errorMessages),
      userName: yup.string().required(errorMessages),
      emailAddress: yup.string().required(errorMessages).email(),
      password: yup.string().required(errorMessages),
      tenantId: yup
        .number()
        .optional()
        .notOneOf([0], t(i18nKeys.auth.register.invalidTenant) as never)
        .nullable(),
      confirmPassword: yup
        .string()
        .required(errorMessages)
        .equals(
          [yup.ref('password')],
          t(i18nKeys.auth.register.passwordNotMatch) as never,
        ),
      confirmPolicy: yup
        .boolean()
        .required(errorMessages)
        .oneOf([true], t(i18nKeys.auth.register.mustConfirmPolicy) as never),
    })
    .required();

  return yupResolver(registerSchema);
};
