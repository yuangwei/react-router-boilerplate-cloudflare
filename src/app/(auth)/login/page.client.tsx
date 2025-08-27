'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import AuthForm, {
  AuthFormDividing,
  AuthFormField,
  AuthFormHeader,
  AuthFormOauthButton,
  AuthFormSubmit,
  AuthFormTerms,
} from '@/components/auth/form';
import { authClient } from '@/lib/auth.client';

export default function Login() {
  const router = useRouter();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const formSchema = useMemo(
    () =>
      z.object({
        email: z.string().min(2, {
          message: 'Email must be at least 2 characters.',
        }),
        password: z.string().min(2, {
          message: 'Password must be at least 2 characters.',
        }),
      }),
    []
  );

  const onSubmit = async function (values: z.infer<typeof formSchema>) {
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        headers: {
          'x-captcha-response': turnstileToken!,
        },
      },
    });
    if (!error) {
      toast.success('Login successful');
      router.push('/dashboard');
      return;
    }
    toast.error(error?.message ?? 'Something went wrong');
  };

  return (
    <AuthForm
      formSchema={formSchema}
      submitText="Login"
      onSubmit={onSubmit}
      defaultValues={{
        email: '',
        password: '',
      }}
    >
      <AuthFormHeader title="Login">
        <div className="text-center text-sm">
          Not have an account?{' '}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up now
          </Link>
        </div>
      </AuthFormHeader>
      <AuthFormField label="Email" name="email" type="email" />
      <AuthFormField
        name="password"
        label="Password"
        type="password"
        labelExtra={
          <Link
            href="/forgot-password"
            className="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </Link>
        }
      />
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={setTurnstileToken}
      />
      <AuthFormSubmit>Login with Email</AuthFormSubmit>
      <AuthFormDividing />
      <div className="flex gap-2">
        <AuthFormOauthButton url={'/api/oauth/google'} logo="/google.svg">
          Login with Google
        </AuthFormOauthButton>
      </div>
      <AuthFormTerms />
    </AuthForm>
  );
}
