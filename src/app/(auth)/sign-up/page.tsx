import { type Metadata } from 'next';

import Form from './page.client';

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Sign Up',
  };
};
export default function Page() {
  return <Form />;
}
