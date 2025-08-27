import type { Metadata } from 'next/types';

import websiteConfig from '@/config/website';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: websiteConfig.basicInfo.baseUrl,
      images: '/og.png',
      siteName: websiteConfig.basicInfo.title,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@money_is_shark',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og.png',
      ...override.twitter,
    },
    alternates: {
      canonical: websiteConfig.basicInfo.baseUrl,
      types: {
        'application/rss+xml': [
          {
            title: websiteConfig.basicInfo.title,
            url: `${websiteConfig.basicInfo.baseUrl}/blog/rss.xml`,
          },
        ],
      },
      ...override.alternates,
    },
  };
}
