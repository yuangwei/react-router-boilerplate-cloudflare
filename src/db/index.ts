import { drizzle } from "drizzle-orm/d1";
import { cache } from "react";
import * as schema from "./schema";

// main db
export const getDB = cache((env: Env) => {
	const db = drizzle(env.DB, { schema });
	return db;
});
