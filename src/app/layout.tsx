import { RootProvider } from 'fumadocs-ui/provider';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Toaster } from 'sonner';

import websiteConfig from '@/config/website';
import { geistMono } from '@/lib/fonts';
import { createMetadata } from '@/lib/metadata';
import '@/styles/globals.css';

export async function generateMetadata() {
  return createMetadata({
    title: {
      default: websiteConfig.basicInfo.title,
      template: `%s | ${websiteConfig.basicInfo.title}`,
    },
    description: websiteConfig.basicInfo.description,
  });
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <NextIntlClientProvider>
        <RootProvider
          i18n={{
            locale,
            locales: websiteConfig.i18n.locales.map((locale) => ({
              locale: locale.code,
              name: locale.name,
            })),
            translations: {
              cn: {
                search: 'Translated Content',
              },
            }[locale],
          }}
        >
          <body className={`antialiased ${geistMono.className}`}>
            {children}
            <Toaster richColors position="top-center" />
          </body>
        </RootProvider>
      </NextIntlClientProvider>
    </html>
  );
}
