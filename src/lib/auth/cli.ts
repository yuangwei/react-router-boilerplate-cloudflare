import { getAuth } from ".";

async function getDevAuth() {
	let devEnv
	const dotenv = await import("dotenv");
	const result = dotenv.config({ path: ".dev.vars" });
	if (result.parsed) {
		devEnv = {
			...result.parsed,
		} as unknown as Cloudflare.Env;
	}
	return getAuth(devEnv!);
}

// just for dev environment
export const auth = await getDevAuth();
