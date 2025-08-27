# Development Guidelines

## Philosophy

### Core Beliefs

- **Incremental progress over big bangs** - Small changes that compile and pass tests
- **Learning from existing code** - Study and plan before implementing
- **Pragmatic over dogmatic** - Adapt to project reality
- **Clear intent over clever code** - Be boring and obvious

### Simplicity Means

- Single responsibility per function/class
- Avoid premature abstractions
- No clever tricks - choose the boring solution
- If you need to explain it, it's too complex

## Process

### 1. Planning & Staging

Break complex work into 3-5 stages. Document in `IMPLEMENTATION_PLAN.md`:

```markdown
## Stage N: [Name]

**Goal**: [Specific deliverable]
**Success Criteria**: [Testable outcomes]
**Tests**: [Specific test cases]
**Status**: [Not Started|In Progress|Complete]
```

- Update status as you progress
- Remove file when all stages are done

### 2. Implementation Flow

1. **Understand** - Study existing patterns in codebase
2. **Test** - Write test first (red)
3. **Implement** - Minimal code to pass (green)
4. **Refactor** - Clean up with tests passing
5. **Commit** - With clear message linking to plan

### 3. When Stuck (After 3 Attempts)

**CRITICAL**: Maximum 3 attempts per issue, then STOP.

1. **Document what failed**:
   - What you tried
   - Specific error messages
   - Why you think it failed

2. **Research alternatives**:
   - Find 2-3 similar implementations
   - Note different approaches used

3. **Question fundamentals**:
   - Is this the right abstraction level?
   - Can this be split into smaller problems?
   - Is there a simpler approach entirely?

4. **Try different angle**:
   - Different library/framework feature?
   - Different architectural pattern?
   - Remove abstraction instead of adding?

## Technical Standards

### Architecture Principles

- **Composition over inheritance** - Use dependency injection
- **Interfaces over singletons** - Enable testing and flexibility
- **Explicit over implicit** - Clear data flow and dependencies
- **Test-driven when possible** - Never disable tests, fix them

### Code Quality

- **Every commit must**:
  - Compile successfully
  - Pass all existing tests
  - Include tests for new functionality
  - Follow project formatting/linting

- **Before committing**:
  - Run formatters/linters
  - Self-review changes
  - Ensure commit message explains "why"

### Error Handling

- Fail fast with descriptive messages
- Include context for debugging
- Handle errors at appropriate level
- Never silently swallow exceptions

## Decision Framework

When multiple valid approaches exist, choose based on:

1. **Testability** - Can I easily test this?
2. **Readability** - Will someone understand this in 6 months?
3. **Consistency** - Does this match project patterns?
4. **Simplicity** - Is this the simplest solution that works?
5. **Reversibility** - How hard to change later?

## Project Integration

### Learning the Codebase

- Find 3 similar features/components
- Identify common patterns and conventions
- Use same libraries/utilities when possible
- Follow existing test patterns

### Tooling

- Use project's existing build system
- Use project's test framework
- Use project's formatter/linter settings
- Don't introduce new tools without strong justification

## Quality Gates

### Definition of Done

- [ ] Tests written and passing
- [ ] Code follows project conventions
- [ ] No linter/formatter warnings
- [ ] Commit messages are clear
- [ ] Implementation matches plan
- [ ] No TODOs without issue numbers

### Test Guidelines

- Test behavior, not implementation
- One assertion per test when possible
- Clear test names describing scenario
- Use existing test utilities/helpers
- Tests should be deterministic

## Important Reminders

**NEVER**:

- Use `--no-verify` to bypass commit hooks
- Disable tests instead of fixing them
- Commit code that doesn't compile
- Make assumptions - verify with existing code

**ALWAYS**:

- Commit working code incrementally
- Update plan documentation as you go
- Learn from existing implementations
- Stop after 3 failed attempts and reassess

## Project-Specific Guidelines

### Directory Structure & Routing Constraints

**Next.js App Router Structure**:

- Use route groups `(auth)` and `(marketing)` for logical organization
- Authentication pages go in `src/app/(auth)/` (login, sign-up)
- Marketing/public pages go in `src/app/(marketing)/` (home, blog, about)
- Dynamic routes use bracket notation: `[slug]`, `[page]`
- API routes in `src/app/api/` following REST conventions

**Component Organization**:

- UI primitives in `src/components/ui/` (shadcn components)
- Shared components in `src/components/shared/` (logo, theme toggle)
- Feature-specific components in `src/components/[feature]/` (auth, marketing, content, mail)
- MagicUI components in `src/components/magicui/`

**Configuration Structure**:

- All configs in `src/config/` directory
- Separate files for different domains: `website.ts`, `marketing.ts`
- Use `defineConfig()` wrapper for type safety and methods
- Import from `@/config/[module]` in components

**Content Organization**:

- Blog content in `content/blog/[locale]/` using MDX format
- Static pages in `content/page/[locale]/` using MDX format
- Follow locale-based directory structure for i18n support

### Configuration System Constraints

**Config Structure Requirements**:

- All configurations must use `defineConfig<T>()` from `@/lib/config`
- Configurations must implement corresponding TypeScript interfaces from `@/types/config`
- Environment variables should be accessed within config files, not components
- Use the config system's built-in methods: `getConfig()`, `isConfigEnabled()`, `hasConfig()`

**Website Configuration**:

```typescript
// Required structure for website config
{
  basicInfo: { title, description, appPrefix, baseUrl },
  i18n: { enable, defaultLocale, locales },
  theme: { defaultTheme, enableThemeToggle }
}
```

**Marketing Configuration**:

```typescript
// Required structure for marketing config
{
  headerMenus: [{ name, href, external? }],
  footerMenus: [{ group, items: [{ name, href, external? }] }],
  socialLinks: [{ name, href, icon }]
}
```

### Blog System Constraints

**Technology Stack**:

- Use Fumadocs for content management (`fumadocs-core`, `fumadocs-mdx`)
- MDX files with frontmatter for all blog content
- Locale-based directory structure under `content/blog/`

**MDX Frontmatter Requirements**:

```yaml
title: 'Required - Article title'
description: 'Required - Article description'
date: 'Required - YYYY-MM-DD format'
tags: ['Optional - Array of tags']
featured: false # Optional - Boolean
readTime: 'Optional - e.g., "5 min read"'
author: 'Optional - Author name'
```

**Blog Implementation Rules**:

- Use `blogSource.getPages(locale)` to fetch locale-specific content
- Sort by date descending for chronological order
- Implement tag filtering with counts
- Support pagination for large content sets
- Use `BlogCard` component for consistent presentation

### Internationalization (i18n) Constraints

**Locale Configuration**:

- Configure locales in `src/config/website.ts` with code, name, and flag
- Use `next-intl` for client/server-side translations
- Default locale configured in website config, not hardcoded

**Translation Files**:

- JSON translation files in `locales/[locale].json`
- Use nested objects for organization: `{ "auth": { "login": "Login" } }`
- Access via `useTranslations()` hook or `getTranslations()` server function

**Content Localization**:

- Separate MDX files per locale in `content/blog/[locale]/`
- Use `getLocale()` from next-intl for server components
- Configure fumadocs i18n to match website config locales

### UI Component Library Constraints

**Primary Component Sources**:

- **shadcn/ui**: Core UI primitives (buttons, inputs, dialogs)
- **MagicUI**: Enhanced animations and effects
- **21st.dev**: Modern component patterns and layouts
- **Tailark**: Additional UI components and blocks

**Installation Commands**:

```bash
# For shadcn/ui components
npx shadcn@latest add [component-name]

# For adding new components to the project
npx shadcn@latest add button dialog form input
```

**Component Guidelines**:

- Use Lucide React for icons (`lucide-react`)
- Follow New York style variant for shadcn components
- Use Tailwind CSS for styling with CSS variables for theming
- Import UI components from `@/components/ui/[component]`
- Import shared components from `@/components/shared/[component]`

**Styling Constraints**:

- Use `cn()` utility for conditional classes (from `@/lib/utils`)
- Follow established design tokens in `globals.css`
- Use CSS variables for theme-aware styling
- Prefer composition over inheritance for component variants

### Authentication & Email Constraints

**Authentication Stack**:

- **Better Auth** as the primary authentication library
- **Drizzle ORM** for database interactions with PostgreSQL
- **Resend** for transactional email delivery
- **Cloudflare Turnstile** for CAPTCHA protection

**Authentication Configuration**:

```typescript
// Required auth setup in src/lib/auth.ts
{
  emailAndPassword: { enabled: true, sendWelcomeEmail },
  socialProviders: { google: { clientId, clientSecret } },
  database: drizzleAdapter(db, { provider: 'pg', schema }),
  plugins: [nextCookies(), oneTap(), captcha()]
}
```

**Email Service Setup**:

- Use React Email components for email templates
- Welcome email component in `src/components/mail/sign-up-success.tsx`
- Email service configuration in `src/lib/mail.tsx`
- Environment variables: `RESEND_API_KEY`, `GOOGLE_CLIENT_ID`, etc.

**Authentication Flow Requirements**:

- Cookie prefix must match `websiteConfig.basicInfo.appPrefix`
- CAPTCHA protection on sign-up and login endpoints
- Welcome email sent automatically on successful registration
- Support for Google OAuth with proper client configuration

**Database Schema**:

- Use Drizzle schema definitions in `src/db/schema.ts`
- Follow Better Auth's required schema structure
- Run migrations using `pnpm db:migrate` command
- Use `pnpm db:studio` for database inspection

### Security & Environment Variables

**Required Environment Variables**:

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
RESEND_API_KEY="your-resend-api-key"

# CAPTCHA
TURNSTILE_SECRET_KEY="your-cloudflare-turnstile-secret"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Security Best Practices**:

- Never commit environment variables to version control
- Use type-safe environment variable validation
- Implement proper CORS and CSRF protection
- Use HTTPS in production environments
- Implement rate limiting for authentication endpoints
