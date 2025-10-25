import Stripe from "stripe";

export const getStripeClient = (env: Cloudflare.Env) => {
  const stripe = new Stripe(env.STRIPE_API_KEY!, {
    apiVersion: "2025-09-30.clover",
    httpClient: Stripe.createFetchHttpClient(),
  });
  return stripe;
};

export const subscribePlan = [
  {
    name: "basic",
    priceId: "price_1234567890",
    annualDiscountPriceId: "price_1234567890",
    limits: {
      projects: 5,
      storage: 10,
    },
  },
  {
    name: "pro",
    priceId: "price_0987654321",
    limits: {
      projects: 20,
      storage: 50,
    },
    freeTrial: {
      days: 14,
    },
  },
];
