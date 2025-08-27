import Footer from '@/components/marketing/footer';
import Header from '@/components/marketing/header';
import marketingConfig from '@/config/marketing';
import websiteConfig from '@/config/website';
import '@/styles/content.css';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header menuItems={marketingConfig.headerMenus} />
      <main className="flex-1 pt-24">{children}</main>
      <Footer
        footerMenus={marketingConfig.footerMenus}
        appName={websiteConfig.basicInfo.title}
        i18nEnabled={websiteConfig.i18n.enable}
        themeEnabled={websiteConfig.theme.enableThemeToggle}
      />
    </div>
  );
}
