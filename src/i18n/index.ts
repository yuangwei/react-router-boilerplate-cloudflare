import websiteConfig from '@/config/website';

export type Locale = (typeof websiteConfig.i18n.locales)[number]['code'];

export const locales = websiteConfig.i18n.locales.map(
  async (locale) => locale.code
);

export const defaultLocale: Locale = websiteConfig.i18n.defaultLocale;
