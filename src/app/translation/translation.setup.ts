import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import { resources } from './resources';

i18next.use(initReactI18next).init({
  resources,

  lng: 'pt',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
