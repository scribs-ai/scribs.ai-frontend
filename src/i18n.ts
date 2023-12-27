import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enTranslations } from "./translation/en";
import { frTranslations } from "./translation/fr";
import { deTranslations } from "./translation/de";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
    de: {
      translation: deTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
export default i18n;
