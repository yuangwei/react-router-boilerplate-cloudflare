# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application configured to deploy on Cloudflare Workers using the OpenNext Cloudflare adapter. The project is a minimal boilerplate that uses:

- Next.js 15.4.6 with React 19
- TypeScript for type safety
- Tailwind CSS for styling
- OpenNext Cloudflare for deployment
- ESLint and Prettier for code quality

## Key Architecture

- **App Router**: Uses Next.js App Router (`src/app/` directory structure)
- **Cloudflare Workers**: Configured to deploy as Cloudflare Workers via `@opennextjs/cloudflare`
- **TypeScript**: Strict TypeScript configuration with path aliases (`@/*` → `./src/*`)
- **Styling**: Geist Sans and Geist Mono fonts are configured in `src/lib/fonts.ts`

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting without changes
- `pnpm type-check` - Run TypeScript type checking without emitting files
- `pnpm validate` - Run all checks (type-check, lint, format:check, build)

## Deployment Commands

- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm preview` - Build and preview locally before deployment
- `pnpm cf-typegen` - Generate TypeScript types for Cloudflare environment

## Configuration Files

- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext Cloudflare adapter configuration
- `next.config.ts` - Next.js configuration with Cloudflare dev support
- `cloudflare-env.d.ts` - TypeScript definitions for Cloudflare environment

## Project Structure

```
src/
├── app/           # Next.js App Router pages
│   ├── layout.tsx # Root layout with font configuration
│   └── page.tsx   # Homepage
├── lib/           # Utility functions and configurations
│   └── fonts.ts   # Font definitions (Geist Sans/Mono)
└── styles/        # Global CSS styles
    └── globals.css
```

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

Break complex work into 3-5 stages. Document in `docs/IMPLEMENTATION_PLAN.md`:

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

- **Language Standards**:
  - All code comments and text content must be in English by default
  - Variable names, function names, and documentation should use English
  - Only use other languages when explicitly requested in the prompt
  - This ensures consistency and international accessibility

- **After generating code**:
  - Run `pnpm format` to ensure code formatting compliance
  - Verify code compiles and follows project conventions

- **Every commit must**:
  - Compile successfully
  - Pass all existing tests
  - Include tests for new functionality
  - Follow project formatting/linting
  - Use conventional commit message format (enforced by commitlint)

- **Before committing**:
  - Run formatters/linters
  - Self-review changes
  - Ensure commit message follows conventional format: `type(scope): description`
  - Commit message types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

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

**OTHER**:

- The project uses ES modules (`"type": "module"` in package.json)
- TypeScript paths are configured for `@/*` imports pointing to `src/*`
- The application is minimal and serves as a starting point for Cloudflare Workers deployment

## Git Hooks & Quality Assurance

The project uses **Husky** for Git hooks to prevent broken code from being committed:

### Pre-commit Hook (`.husky/pre-commit`)
Automatically runs on every commit attempt:
1. **lint-staged**: Formats and lints only staged files
2. **TypeScript check**: Fast type checking (`tsc --noEmit`)
3. **Build verification**: Full build to catch module resolution and other errors

This catches issues like:
- Import path errors (e.g., `./globals.css` instead of `../styles/globals.css`)
- TypeScript compilation errors
- Module resolution failures
- Build configuration problems

### Commit Message Hook (`.husky/commit-msg`)
Enforces conventional commit format using commitlint:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`

### Manual Quality Checks
Run `pnpm validate` to execute all quality checks manually before committing.
