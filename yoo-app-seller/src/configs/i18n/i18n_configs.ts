import i18n from 'i18next';

import localesResource from './lang';
import {initReactI18next} from 'react-i18next';
import {getTranslationKeys} from 'i18n-keys';
import {en} from './lang/en';

const initLang = async () => {
  i18n.use(initReactI18next).init({
    initImmediate: false,
    compatibilityJSON: 'v3',
    fallbackLng: 'vi',
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
