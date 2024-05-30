import { i18nKeys } from '@src/configs/i18n';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

export const useCreateAutomationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    conditionsType: yup.string().required(t(i18nKeys.validation.required)),
    name: yup.string().required(t(i18nKeys.validation.required)),
    conditions: yup
      .array()
      .of(
        yup.object().shape({
          compare: yup.string().nullable(),
          deviceId: yup.string().nullable(),
          attribute: yup.string().nullable(),
          ep: yup.string().nullable(),
          value: yup.string().nullable(),
          schedule: yup.string().nullable(),
        }),
      )
      .required(t(i18nKeys.validation.required))
      .min(1, t(i18nKeys.validation.required)),
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
      .min(1, t(i18nKeys.validation.required)),
  });
};

export const useUpdateAutomationSchema = () => {
  const { t } = useTranslation();

  return yup.object().shape({
    conditionsType: yup.string().required(t(i18nKeys.validation.required)),
    name: yup.string().required(t(i18nKeys.validation.required)),
    conditions: yup
      .array()
      .of(
        yup.object().shape({
          compare: yup.string().nullable(),
          deviceId: yup.string().nullable(),
          attribute: yup.string().nullable(),
          ep: yup.string().nullable(),
          value: yup.string().nullable(),
          schedule: yup.string().nullable(),
        }),
      )
      .required(t(i18nKeys.validation.required))
      .min(1, t(i18nKeys.validation.required)),
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
      .min(1, t(i18nKeys.validation.required)),
  });
};
