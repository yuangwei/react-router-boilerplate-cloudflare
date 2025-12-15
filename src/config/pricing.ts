import type { StripePlan } from "@better-auth/stripe";
import { defineConfig } from "@/lib/config";

export default defineConfig<{ subscribePlan: StripePlan[] }>({
	subscribePlan: [
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
	],
});
