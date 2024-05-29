import { i18nKeys } from '@src/configs/i18n';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useCreateMomentSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    name: yup.string().required(t(i18nKeys.validation.required)),
    actions: yup
      .array()
      .of(
        yup.object().shape({
          index: yup.number().required(t(i18nKeys.validation.required)),
          deviceId: yup.string(),
          attribute: yup.string(),
          ep: yup.string(),
          value: yup.string(),
          delay: yup.number(),
          doAutomationSceneId: yup.number(),
          doAutomationSceneEnabled: yup.boolean(),
          doMomentSceneId: yup.number(),
        }),
      )
      .required(t(i18nKeys.validation.required))
      .min(1),
  });
};

export const useUpdateMomentSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    name: yup.string().required(t(i18nKeys.validation.required)),
    actions: yup
      .array()
      .of(
        yup.object().shape({
          index: yup.number().required(t(i18nKeys.validation.required)),
          deviceId: yup.string(),
          attribute: yup.string(),
          ep: yup.string(),
          value: yup.string(),
          delay: yup.number(),
          doAutomationSceneId: yup.number(),
          doAutomationSceneEnabled: yup.boolean(),
          doMomentSceneId: yup.number(),
        }),
      )
      .required(t(i18nKeys.validation.required))
      .min(1),
  });
};
