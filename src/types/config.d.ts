export interface LocaleConfig {
  code: string;
  name: string;
  flag?: string;
}

export interface I18nConfig {
  enable: boolean;
  defaultLocale: string;
  locales: LocaleConfig[];
}

export interface WebsiteConfig {
  basicInfo: {
    title: string;
    description: string;
    appPrefix: string;
    baseUrl?: string;
    logo?: React.ReactNode;
    keywords?: string[];
    author?: string;
    creator?: string;
    publisher?: string;
  };
  i18n: I18nConfig;
  theme?: {
    defaultTheme?: 'light' | 'dark' | 'system';
    enableThemeToggle?: boolean;
  };
}

export interface MarketingConfig {
  headerMenus: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
  footerMenus: Array<{
    group: string;
    items: Array<{
      name: string;
      href: string;
      external?: boolean;
    }>;
  }>;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}

export interface ConfigMethods<T> {
  getConfig<K extends keyof T>(key: K): T[K];
  isConfigEnabled(key: keyof T): boolean;
  hasConfig(key: keyof T): boolean;
  updateConfig<K extends keyof T>(key: K, value: Partial<T[K]>): void;
}

export type ConfigWithMethods<T> = T & ConfigMethods<T>;
