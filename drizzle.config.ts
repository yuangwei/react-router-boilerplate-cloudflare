import type { Config } from 'drizzle-kit'

// Only run on db studio
export default {
  out: './src/db/migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'sqlite',
  dbCredentials: {
    url: "file:./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/f293fc6d7ca96e8b392c1dbe8e62e7c7c111e9bac1baf9cf2c9933b8ba73ca6e.sqlite",
  },
} satisfies Config