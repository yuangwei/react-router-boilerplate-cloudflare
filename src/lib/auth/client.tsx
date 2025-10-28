import { createAuthClient } from "better-auth/react"
import { stripeClient } from "@better-auth/stripe/client"

export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_AUTH_BASE_URL!,
	plugins: [
		stripeClient({
			subscription: true,
		}),
	],
})
