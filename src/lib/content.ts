import { blog, page } from '@@/.source';
import { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

import websiteConfig from '@/config/website';

export const contentI18n: I18nConfig = {
  parser: 'dir',
  hideLocale: 'always',
  defaultLanguage: websiteConfig.i18n.defaultLocale,
  languages: websiteConfig.i18n.locales.map((locale) => locale.code),
};

export const blogSource = loader({
  i18n: contentI18n,
  baseUrl: '/blog',
  source: createMDXSource(blog),
});

export const pageSource = loader({
  i18n: contentI18n,
  baseUrl: '/page',
  source: createMDXSource(page),
});
