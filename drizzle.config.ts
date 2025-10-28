import config from "dotenv";
import { defineConfig } from "drizzle-kit";

config.config({ path: ".dev.vars" });

export default defineConfig({
  out: "./migrations",
  schema: "./src/db/schema/index.ts",
  dialect: "turso", // or "postgresql" | "mysql" | "sqlite", see: https://orm.drizzle.team/docs/drizzle-config-file
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
});
