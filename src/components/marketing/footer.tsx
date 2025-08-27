import Link from 'next/link';

import { AnimatedThemeToggler } from '../shared/animated-theme-toggler';
import LanguageTogger from '../shared/language-togger';

import { Logo } from '@/components/shared/logo';

function FooterMenus({
  footerMenus,
}: {
  footerMenus: { group: string; items: { name: string; href: string }[] }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
      {footerMenus.map((link, index) => (
        <div key={index} className="space-y-4 text-sm">
          <span className="block font-medium">{link.group}</span>
          {link.items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-muted-foreground hover:text-primary block duration-150"
            >
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function FooterSection({
  footerMenus,
  appName,
  i18nEnabled,
  themeEnabled,
}: {
  footerMenus: { group: string; items: { name: string; href: string }[] }[];
  appName: string;
  i18nEnabled: boolean;
  themeEnabled: boolean;
}) {
  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" aria-label="go home" className="block size-fit">
              <Logo />
            </Link>
          </div>
          <FooterMenus footerMenus={footerMenus} />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t py-2 min-h-15">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} {appName}, All rights reserved
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            {i18nEnabled && <LanguageTogger />}
            {themeEnabled && <AnimatedThemeToggler />}
          </div>
        </div>
      </div>
    </footer>
  );
}
