'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

import AuthForm, {
  AuthFormDividing,
  AuthFormField,
  AuthFormHeader,
  AuthFormOauthButton,
  AuthFormSubmit,
  AuthFormTerms,
} from '@/components/auth/form';
import AuthLayout from '@/components/auth/layout';
import { authClient } from '@/lib/auth.client';

export default function SignUp() {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const formSchema = useMemo(
    () =>
      z
        .object({
          email: z.string().min(2, {
            message: 'Email must be at least 2 characters.',
          }),
          password: z.string().min(2, {
            message: 'Password must be at least 2 characters.',
          }),
          confirm_password: z.string().min(2, {
            message: 'Password must be at least 2 characters.',
          }),
          first_name: z.string().optional(),
          last_name: z.string().optional(),
        })
        .refine((data) => data.password === data.confirm_password, {
          message: 'Passwords do not match',
          path: ['confirm_password'],
        }),
    []
  );

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.first_name ? `${values.first_name} ${values.last_name}` : '',
      fetchOptions: {
        headers: {
          'x-captcha-response': turnstileToken as string,
        },
      },
    });

    if (!error) {
      toast.success('Sign up successful');
      router.push('/login');
      return;
    }
    toast.error(error?.message || 'Something went wrong');
  };

  return (
    <AuthForm formSchema={formSchema} submitText="Sign Up" onSubmit={onSubmit}>
      <AuthFormHeader title="Sign Up">
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </AuthFormHeader>
      <div className="flex justify-between gap-4">
        <AuthFormField label="First Name" name="first_name" type="text" />
        <AuthFormField label="Last Name" name="last_name" type="text" />
      </div>
      <AuthFormField label="Email" name="email" type="email" />
      <AuthFormField label="Password" name="password" type="password" />
      <AuthFormField
        label="Confirm Password"
        name="confirm_password"
        type="password"
      />
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={setTurnstileToken}
      />
      <AuthFormSubmit>Sign Up with Email</AuthFormSubmit>
      <AuthFormDividing />
      <AuthFormOauthButton url={'/api/oauth/google'} logo="/google.svg">
        Sign Up with Google
      </AuthFormOauthButton>
      <AuthFormTerms />
    </AuthForm>
  );
}
