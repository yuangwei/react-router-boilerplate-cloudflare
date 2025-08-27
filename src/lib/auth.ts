import { stripe } from '@better-auth/stripe';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { captcha, oneTap } from 'better-auth/plugins';

import { sendWelcomeEmail } from './mail';
import { stripeClient } from './payment';

import websiteConfig from '@/config/website';
import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
  advanced: {
    cookiePrefix: websiteConfig.basicInfo.appPrefix,
  },
  emailAndPassword: {
    enabled: true,
    sendWelcomeEmail: (user) => sendWelcomeEmail(user.email),
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  plugins: [
    nextCookies(),
    oneTap(),
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
      endpoints: ['/sign-up/email', '/login/email'],
    }),
    // stripe({
    //   stripeClient,
    //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
    //   createCustomerOnSignUp: true,
    //   subscription: {
    //     enabled: true,
    //     plans: [
    //       {
    //         name: 'basic',
    //         priceId: 'price_1234567890',
    //         annualDiscountPriceId: 'price_1234567890',
    //         limits: {
    //           projects: 5,
    //           storage: 10,
    //         },
    //       },
    //       {
    //         name: 'pro',
    //         priceId: 'price_0987654321',
    //         limits: {
    //           projects: 20,
    //           storage: 50,
    //         },
    //         freeTrial: {
    //           days: 14,
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
});
