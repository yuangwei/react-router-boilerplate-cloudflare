import packageJson from '@@/package.json';

import defineConfig from '@/lib/config';
import type { WebsiteConfig } from '@/types/config';

export default defineConfig<WebsiteConfig>({
  basicInfo: {
    title: 'ScratchStarter',
    description: 'A modern full-stack application starter template',
    appPrefix: packageJson.name,
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    keywords: [
      'nextjs',
      'react',
      'typescript',
      'tailwindcss',
      'starter',
      'template',
      'full-stack',
    ],
    author: 'ScratchStarter',
    creator: 'ScratchStarter',
    publisher: 'ScratchStarter',
  },
  i18n: {
    enable: false,
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
      },
      {
        code: 'jp',
        name: '日本語',
        flag: '🇯🇵',
      },
    ],
  },
  theme: {
    defaultTheme: 'system',
    enableThemeToggle: true,
  },
});
