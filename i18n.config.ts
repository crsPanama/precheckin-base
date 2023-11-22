import { uiEn } from './lang/uiEn';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: uiEn,
    fr: {
      welcome: 'Bienvenue',
    },
  },
}));
