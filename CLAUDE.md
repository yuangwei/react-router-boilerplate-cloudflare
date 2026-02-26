# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack application deployed on Cloudflare Workers using React Router 7. The project includes:

- **React Router 7** with SSR for the frontend
- **Cloudflare Workers** for serverless deployment
- **Drizzle ORM** with SQLite (Cloudflare D1) for the database
- **Better Auth** for authentication with Stripe integration
- **Hono** for API routes
- **Tailwind CSS v4** for styling

## Development Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build the application for production
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm preview` - Build and preview locally
- `pnpm typecheck` - Run TypeScript type checking with Cloudflare types
- `pnpm format` - Format code with Biome

## Database Commands

- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Apply remote D1 migrations
- `pnpm db:migrate-local` - Apply local D1 migrations
- `pnpm db:push` - Push schema changes to D1
- `pnpm db:studio` - Open Drizzle Studio

## Auth Commands

- `pnpm auth:generate` - Generate Better Auth schema
- `pnpm auth:migrate` - Run Better Auth migrations

## Key Architecture

### API Routes
- API routes are built with **Hono** and mounted at `/api`
- Located in [src/api/](src/api/)
- Use unified response format from [src/lib/api.ts](src/lib/api.ts):

```typescript
import { success, error } from "@/lib/api";

return success(c, data);
return error(c, "Error message", 400);
```

### Authentication
- Uses **Better Auth** with Drizzle ORM adapter
- Configured in [src/lib/auth/index.ts](src/lib/auth/index.ts)
- Includes plugins: apiKey, organization, stripe
- Helper functions: `getCurrentUser()`, `requireAuth()`, `isAuthenticated()`

### Database
- Uses **Drizzle ORM** with SQLite (Cloudflare D1)
- Schema defined in [src/db/schema/](src/db/schema/)
- Migrations in [src/db/migrations/](src/db/migrations/)

### Cloudflare Bindings
- `DB` - D1 database
- `KV` - KV namespace
- `R2_BUCKET` - R2 storage

### Entry Point
- Worker entry: [workers/app.ts](workers/app.ts)
- Mounts API routes at `/api`
- React Router handles all other routes

## Configuration Files

- `wrangler.jsonc` - Cloudflare Workers configuration
- `react-router.config.ts` - React Router configuration
- `drizzle.config.ts` - Drizzle ORM configuration
- `biome.json` - Code formatting/linting

## Project Structure

```
src/
├── api/              # Hono API routes
│   └── v1/          # API v1 routes
├── db/              # Database schemas and migrations
│   └── schema/      # Drizzle schemas
├── lib/             # Utilities (auth, api, stripe, kv, storage)
├── routes/          # React Router routes
├── components/      # React components
└── styles/          # Global CSS
workers/
├── app.ts           # Worker entry point
└── queue.ts         # Queue handlers
```

## Code Standards

- Use **Biome** for formatting (not Prettier)
- TypeScript paths use `@/*` alias pointing to `src/*`
- All code comments in English
- Conventional commit messages enforced by commitlint
