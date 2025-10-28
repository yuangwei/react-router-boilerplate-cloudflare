import { getAuth } from "@/lib/auth";
import type { Route } from "./+types/home";
import { useEffect } from "react";
import { authClient } from "@/lib/auth/client";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export async function loader({ context, request }: Route.LoaderArgs) {
	const auth = getAuth(context.cloudflare.env);
	const session = await auth.api.getSession({ headers: request.headers });
	return { session };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	useEffect(() => {
		if (!loaderData.session?.user) {
			console.log("No user session, initiating social sign-in...");
			authClient.signIn.social({
				provider: "google",
			});
		}
	}, [loaderData]);
	return loaderData.session?.user.email;
}
