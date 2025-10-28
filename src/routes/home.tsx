import type { Route } from "./+types/home";
import { useNavigate } from "react-router";
import { authClient } from "@/lib/auth/client";
import { getAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export async function loader({ context, request }: Route.LoaderArgs) {
	const auth = getAuth(context.cloudflare.env);
	const session = await auth.api.getSession({ headers: request.headers });
	return { session };
}

export function meta({ loaderData }: Route.MetaArgs) {
	return [
		{
			title: !loaderData.session?.user
				? "New React Router App"
				: loaderData.session.user.name,
		},
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { session } = loaderData;
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = () => {
		authClient.signIn.social({
			provider: "google",
		});
	};

	const logout = async () => {
		setLoading(true);
		await authClient.signOut();
		setLoading(false);
		navigate("/", { replace: true });
	};

	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-10">
			{session ? (
				<div className="flex gap-2 items-center">
					<h1>Welcome, {session.user?.name}!</h1>{" "}
					<Button variant="link" onClick={logout} disabled={loading}>
						Logout {loading && "..."}
					</Button>
				</div>
			) : (
				<Button onClick={login}>Login with Google</Button>
			)}
		</div>
	);
}
