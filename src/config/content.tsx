import { Logo } from '@/components/shared/logo';
import { contentI18n } from '@/lib/content';

const contentConfig = {
  i18n: contentI18n,
  baseOptions: {
    nav: {
      title: <Logo />,
    },
  },
};

export default contentConfig;
