'use server';

import { cookies } from 'next/headers';

import websiteConfig from '@/config/website';
import { Locale, defaultLocale } from '@/i18n';

const COOKIE_NAME = `${websiteConfig.basicInfo.appPrefix}_i18n`;

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
