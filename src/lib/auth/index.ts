import { betterAuth, type User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { stripe } from "@better-auth/stripe";
import { apiKey, organization } from "better-auth/plugins";
import { getDB } from "@/db";
import { getStripeClient } from "@/lib/stripe";
import pricingConfig from "@/config/pricing";

let cachedAuth: ReturnType<typeof betterAuth> | null = null;

export function getAuth(env: Cloudflare.Env) {
  if (cachedAuth) {
    return cachedAuth;
  }
  const db = getDB(env);
  console.log("Initializing Better Auth...");
  cachedAuth = betterAuth({
    secret: env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(db, {
      provider: "sqlite",
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      google: {
        enabled: true,
        clientId: env.GOOGLE_CLIENT_ID!,
        clientSecret: env.GOOGLE_CLIENT_SECRET!,
      },
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    socialLogin: {
      callbackURL: "/callback",
    },
    plugins: [
      apiKey({
        enableSessionForAPIKeys: true,
        rateLimit: {
          enabled: false,
        },
      }),
      organization(),
      stripe({
        stripeClient: getStripeClient(env),
        stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET!,
        createCustomerOnSignUp: true,
        subscription: {
          enabled: true,
          plans: pricingConfig.subscribePlan,
        },
      }),
    ],
  });

  return cachedAuth;
}
/**
 * Get the current authenticated user from the session
 * Returns null if no user is authenticated
 */
export async function getCurrentUser(
  env: Cloudflare.Env,
  headers: Headers,
): Promise<User | null> {
  try {
    const auth = getAuth(env);
    const session = await auth.api.getSession({
      headers,
    });

    if (!session?.user) {
      return null;
    }
    // @ts-ignore
    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Get the current authenticated user or throw an error
 * Use this when authentication is required
 */
export async function requireAuth(
  env: Cloudflare.Env,
  headers: Headers,
): Promise<User> {
  const user = await getCurrentUser(env, headers);

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

/**
 * Check if a user is authenticated
 */
export async function isAuthenticated(
  env: Cloudflare.Env,
  headers: Headers,
): Promise<boolean> {
  const user = await getCurrentUser(env, headers);
  return user !== null;
}

/**
 * Get the auth instance for use in server actions and API routes
 */
export async function getAuthInstance(env: Cloudflare.Env) {
  return getAuth(env);
}

/**
 * Get session information
 */
export async function getSession(env: Cloudflare.Env, headers: Headers) {
  try {
    const auth = getAuth(env);
    return await auth.api.getSession({
      headers,
    });
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}
