import type { Route } from "./+types/home";

export function meta() {
	return [
		{
			title: "New React Router App",
		},
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Home() {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center gap-4 mt-10">
			Welcome to React Router!
		</div>
	);
}
