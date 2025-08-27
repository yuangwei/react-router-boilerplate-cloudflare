import defineConfig from '@/lib/config';
import type { MarketingConfig } from '@/types/config';

export default defineConfig<MarketingConfig>({
  headerMenus: [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'About',
      href: '/about',
    },
    {
      name: 'Contact',
      href: '/contact',
    },
  ],
  footerMenus: [
    {
      group: 'Product',
      items: [
        {
          name: 'Features',
          href: '/#features',
        },
        {
          name: 'Pricing',
          href: '/#pricing',
        },
        {
          name: 'FAQ',
          href: '/#faq',
        },
      ],
    },
    {
      group: 'Company',
      items: [
        {
          name: 'About',
          href: '/about',
        },
        {
          name: 'Blog',
          href: '/blog',
        },
        {
          name: 'Careers',
          href: '/careers',
        },
      ],
    },
    {
      group: 'Resources',
      items: [
        {
          name: 'Documentation',
          href: '/docs',
        },
        {
          name: 'Support',
          href: '/support',
        },
        {
          name: 'Community',
          href: '/community',
          external: true,
        },
      ],
    },
    {
      group: 'Legal',
      items: [
        {
          name: 'Privacy Policy',
          href: '/privacy',
        },
        {
          name: 'Terms of Service',
          href: '/terms',
        },
      ],
    },
  ],
  socialLinks: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/scratchstarter',
      icon: 'twitter',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/scratchstarter',
      icon: 'github',
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/scratchstarter',
      icon: 'discord',
    },
  ],
});
