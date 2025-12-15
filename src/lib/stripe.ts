import Stripe from "stripe";

export const getStripeClient = (env: Cloudflare.Env) => {
	console.log("Initializing Stripe client...", env.STRIPE_API_KEY);
	const stripe = new Stripe(env.STRIPE_API_KEY!, {
		apiVersion: "2025-09-30.clover",
		httpClient: Stripe.createFetchHttpClient(),
	});
	return stripe;
};
