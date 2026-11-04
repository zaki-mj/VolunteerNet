import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslation from '../locales/ar.json';

export const SUPPORTED_LANGUAGES = [
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  // Easy to add later:
  // { code: 'fr', label: 'Français', dir: 'ltr' },
  // { code: 'en', label: 'English', dir: 'ltr' },
] as const;

export type SupportedLanguageCode = (typeof SUPPORTED_LANGUAGES)[number]['code'];

const resources = {
  ar: {
    translation: arTranslation,
  },
};

const savedLang = (localStorage.getItem('volunteernet_lang') || 'ar') as SupportedLanguageCode;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export const updateDocumentDirection = (lang: string) => {
  const selected = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
  const dir = selected ? selected.dir : 'rtl';
  document.documentElement.dir = dir;
  document.documentElement.lang = lang;
};

// Initial setup
updateDocumentDirection(savedLang);

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('volunteernet_lang', lng);
  updateDocumentDirection(lng);
});

export default i18n;
