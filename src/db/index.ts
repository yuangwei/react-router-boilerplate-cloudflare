import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const getDB = (env: Cloudflare.Env) => {
	const client = createClient({
		url: env.DATABASE_URL!,
		authToken: env.DATABASE_AUTH_TOKEN!,
	});
	const db = drizzle(client);
	return db;
};
