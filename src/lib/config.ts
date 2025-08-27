import type { ConfigWithMethods } from '@/types/config';

export default function defineConfig<T extends object>(
  config: T
): ConfigWithMethods<T> {
  const enhancedConfig = { ...config } as ConfigWithMethods<T>;

  enhancedConfig.getConfig = function <K extends keyof T>(key: K): T[K] {
    return config[key];
  };

  enhancedConfig.isConfigEnabled = function (key: keyof T): boolean {
    const value = config[key];
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'object' && value !== null) {
      return 'enabled' in value ? Boolean(value.enabled) : true;
    }
    return Boolean(value);
  };

  enhancedConfig.hasConfig = function (key: keyof T): boolean {
    return key in config && config[key] !== undefined && config[key] !== null;
  };

  return enhancedConfig;
}
