import { Resend } from 'resend';

import WelcomeEmail from '@/components/mail/sign-up-success';

export const resendClient = new Resend(process.env.RESEND_API_KEY!);

export const sendWelcomeEmail = async (email: string) => {
  const { data, error } = await resendClient.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Welcome to Resend',
    react: <WelcomeEmail steps={[]} links={[]} />,
  });
};
