'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import {
  type FieldValues,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { toast } from 'sonner';
import { type z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth.client';
import { cn } from '@/lib/utils';

interface FormContextValue {
  form: UseFormReturn<any>;
  schema: any;
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

export const FormProvider = FormContext.Provider;

export default function AuthForm({
  formSchema,
  defaultValues,
  children,
  onSubmit,
}: {
  formSchema: any;
  submitText: string;
  children: React.ReactNode;
  defaultValues?: unknown;
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void> | void;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onFormSubmit = async function (values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      const firstKey = Object.keys(values)[0] as string;
      toast.error((err as Error)?.message ?? 'Something went wrong');
      form.setFocus(firstKey);
      form.reset();
    } finally {
      setLoading(false);
    }
  };

  const onFormError = async function (
    errors: Record<string, { message: string }>
  ) {
    toast.error(errors[Object.keys(errors)[0]].message);
  };

  return (
    <FormProvider value={{ form, schema: formSchema, loading, setLoading }}>
      <Form {...(form as UseFormReturn)}>
        <form
          className="grid gap-6"
          onSubmit={form.handleSubmit(
            onFormSubmit as SubmitHandler<FieldValues>,
            onFormError as SubmitErrorHandler<FieldValues>
          )}
        >
          <div className="grid gap-2">{children}</div>
        </form>
      </Form>
    </FormProvider>
  );
}

export const AuthFormSubmit = function ({
  children,
}: {
  children: string | React.ReactNode;
}) {
  const { loading } = useFormContext();

  return (
    <Button type="submit" className="w-full mt-4" disabled={loading}>
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </Button>
  );
};

export const AuthFormField = function ({
  name,
  label,
  labelExtra,
  type,
  placeholder,
}: {
  name: string;
  label: string;
  labelExtra?: React.ReactNode;
  type: string;
  placeholder?: string;
}) {
  const { form, loading } = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center">
            <FormLabel>{label}</FormLabel>
            {labelExtra}
          </div>

          <FormControl>
            <Input
              className={cn(
                'transition-colors',
                fieldState.error && 'border-red-500 focus-visible:ring-red-500'
              )}
              type={type}
              placeholder={placeholder}
              disabled={loading}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export const AuthFormHeader = function ({
  children,
  title,
}: {
  children?: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center mb-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </div>
  );
};

export const AuthFormDividing = function ({
  children,
}: {
  children?: React.ReactNode | string | null;
}) {
  return (
    <div className="relative text-center mt-2 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
        {children ?? 'Or continue with'}
      </span>
    </div>
  );
};

export const AuthFormOauthButton = function ({
  logo,
  url,
  children,
}: {
  logo: string | React.ReactNode;
  url: string;
  children: string | React.ReactNode;
}) {
  const { loading, setLoading } = useFormContext();

  const onClick = async () => {
    setLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: 'google',
    });
    if (error) {
      toast.error(error.message);
    }
    return data;
  };
  return (
    <Button
      variant="outline"
      type="button"
      className="w-full mt-3"
      disabled={loading}
      onClick={onClick}
    >
      {typeof logo === 'string' ? (
        <Image src={logo} alt="Oauth brand logo" width={18} height={18} />
      ) : (
        logo
      )}
      {children}
    </Button>
  );
};

export const AuthFormTerms = function () {
  return (
    <div className="text-balance text-center mt-2 text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
      By clicking continue, you agree to our{' '}
      <Link href="/terms">Terms of Service</Link> and{' '}
      <Link href="/privacy-policy">Privacy Policy</Link>.
    </div>
  );
};
