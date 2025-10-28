import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { cache } from "react";
import * as schema from "@/db/schema";

export const getSqlite = cache((env: Cloudflare.Env) => {
  const client = createClient({
    url: env.DATABASE_URL!,
    authToken: env.DATABASE_AUTH_TOKEN!,
  });
  const db = drizzle(client, { schema });
  return db;
});
