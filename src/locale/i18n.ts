import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en,
    },
  });

export default i18n;
