import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationSr from './locales/sr/translation.json';

const resources = {
  en: {
    translation: translationEn
  },
  sr: {
    translation: translationSr
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'sr',
  fallbackLng: 'sr',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;