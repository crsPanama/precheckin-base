import { uiEn } from './lang/uiEn';
import { uiEs } from './lang/uiEs';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: uiEn,
    es: uiEs,
  },
}));
