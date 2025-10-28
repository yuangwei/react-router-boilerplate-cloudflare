import { getPostgres } from "./driver/pg";
import { getSqlite } from "./driver/sqlite";
export * from "./schema";

export const getDB = (env: Cloudflare.Env,client: "pg" | "sqlite"): any => {
	if (client === "pg") {
		return getPostgres(env);
	}
	return getSqlite(env);
};
