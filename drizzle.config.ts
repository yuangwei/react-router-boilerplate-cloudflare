import type { Config } from "drizzle-kit";

// Only run on db studio
export default {
  out: "./src/db/migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "file:./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/44fa6adf282e1125bc0e8230d1fb3675b41269ee377ca50dd6b437da8e44cf3a.sqlite",
  },
} satisfies Config;
