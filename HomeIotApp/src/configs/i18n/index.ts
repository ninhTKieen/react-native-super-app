import { storage } from '@src/common/mmkv.storage';
import { getTranslationKeys } from 'i18n-keys';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import localesResource from './lang';
import { en } from './lang/en';

const initLang = async () => {
  const currentLanguage = storage.getString('currentLanguage');

  i18n.use(initReactI18next).init({
    initImmediate: false,
    compatibilityJSON: 'v3',
    fallbackLng: currentLanguage || 'vi',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: localesResource,
    react: {
      useSuspense: false,
    },
  });
};

initLang();

export const i18nKeys = getTranslationKeys(en);
export default i18n;
