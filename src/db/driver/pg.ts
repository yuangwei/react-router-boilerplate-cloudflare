import { drizzle } from "drizzle-orm/node-postgres";
import { cache } from "react";
import { Pool } from "pg";

import * as schema from "@/db/schema";

export const getPostgres = cache((env: Cloudflare.Env) => {
  let connectionString: string;
  if (env.NEXTJS_ENV === "development") {
    connectionString = env.DATABASE_URL!;
  } else {
    // @ts-ignore
    connectionString = env.HYPERDRIVE.connectionString;
  }

  const pool = new Pool({
    connectionString,
    maxUses: 1,
  });
  return drizzle({ client: pool, schema });
});
