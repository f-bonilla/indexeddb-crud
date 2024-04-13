import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

const i18nConfig = async language => {
  return i18next.use(XHR).init({
    lng: language,
    debug: false,
    backend: {
      loadPath: 'assets/i18n/{{lng}}.json',
    },
    supportedLngs: ['es', 'en'],
    nonExplicitSupportedLngs: true,
  });
};

export default i18nConfig;
