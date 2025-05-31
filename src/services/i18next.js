import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import gr from "../locales/gr.json";

export const languageResources = {
  en: { translation: en },
  gr: { translation: gr },
};

i18next.use(initReactI18next).use(LanguageDetector).init({
  compatibilityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources: languageResources,
});

export default i18next;
