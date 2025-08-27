import { getRequestConfig } from 'next-intl/server';

import { getUserLocale } from './server';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default as Record<
      string,
      string
    >,
  };
});
