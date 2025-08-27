# ScratchStarter Development Prompts

## Component Creation Prompts

### Create shadcn UI Component

```
Create a new [component-name] component following shadcn/ui patterns:
1. Use appropriate Radix UI primitives
2. Include proper TypeScript types
3. Use cn() utility for className composition
4. Include Tailwind CSS styling with CSS variables
5. Export from src/components/ui/[component-name].tsx
6. Follow New York style variant
```

### Create Feature Component

```
Create a [feature] component in src/components/[feature]/[component-name].tsx:
1. Use existing UI components from @/components/ui
2. Implement proper TypeScript types
3. Follow component composition patterns
4. Include proper error handling
5. Use config system for any settings
```

### Create Marketing Component

```
Create a marketing component for the landing page:
1. Use marketing config from @/config/marketing
2. Implement responsive design with Tailwind CSS
3. Include proper animations using MagicUI or motion
4. Follow existing marketing component patterns
5. Support dark/light theme variations
```

## Page Creation Prompts

### Create App Router Page

```
Create a new page in src/app/(marketing)/[route]/page.tsx:
1. Use server component for data fetching
2. Implement proper metadata with createMetadata()
3. Follow locale-based content structure
4. Include proper TypeScript types
5. Use Suspense for loading states
```

### Create Blog Page

```
Create a blog-related page:
1. Use blogSource from @/lib/content for data
2. Implement locale-aware content fetching
3. Include tag filtering and sorting
4. Use BlogCard component for consistency
5. Support pagination if needed
```

### Create Auth Page

```
Create an authentication page in src/app/(auth)/[route]/page.tsx:
1. Use Better Auth authentication system
2. Implement proper form validation with react-hook-form
3. Include CAPTCHA protection with Cloudflare Turnstile
4. Use auth config from @/config/auth
5. Handle loading and error states
```

## Configuration Prompts

### Create New Config Module

```
Create a new configuration module in src/config/[module].ts:
1. Define TypeScript interface in @/types/config
2. Use defineConfig<T>() wrapper
3. Access environment variables within config
4. Export using default export
5. Include proper type safety
```

### Update Website Config

```
Update the website configuration:
1. Modify src/config/website.ts
2. Update corresponding TypeScript types
3. Ensure i18n locales are properly configured
4. Update theme settings if needed
5. Test config methods work correctly
```

## Database & API Prompts

### Create API Route

```
Create a new API route in src/app/api/[route]/route.ts:
1. Use Better Auth for authentication if needed
2. Implement proper HTTP methods (GET, POST, PUT, DELETE)
3. Include error handling and validation
4. Use Drizzle ORM for database operations
5. Return proper JSON responses
```

### Create Database Schema

```
Update database schema in src/db/schema.ts:
1. Use Drizzle ORM schema definitions
2. Follow Better Auth required structure
3. Include proper relationships and constraints
4. Generate migration with pnpm db:generate
5. Test with pnpm db:studio
```

## Email & Communication Prompts

### Create Email Template

```
Create a new email template in src/components/mail/[template].tsx:
1. Use React Email components
2. Include proper TypeScript types
3. Support responsive design
4. Include company branding
5. Test with email service
```

### Update Email Service

```
Update email service configuration in src/lib/mail.tsx:
1. Use Resend client configuration
2. Implement proper error handling
3. Include template routing
4. Support multiple email types
5. Configure proper sender information
```

## Internationalization Prompts

### Add New Locale

```
Add a new locale to the application:
1. Update src/config/website.ts with new locale
2. Create translation file in locales/[locale].json
3. Add content directories in content/blog/[locale]/ and content/page/[locale]/
4. Update i18n configuration
5. Test locale switching functionality
```

### Create Translation Keys

```
Add new translation keys:
1. Update appropriate locale files in locales/
2. Use nested object structure for organization
3. Use consistent naming conventions
4. Include all supported languages
5. Test with useTranslations() hook
```

## Testing & Quality Prompts

### Add Component Tests

```
Create tests for [component-name]:
1. Test component rendering
2. Test user interactions
3. Test accessibility features
4. Test responsive behavior
5. Follow existing test patterns
```

### Add Integration Tests

```
Create integration tests for [feature]:
1. Test complete user workflows
2. Test API endpoints
3. Test database operations
4. Test authentication flows
5. Include error scenarios
```

## Maintenance Prompts

### Update Dependencies

```
Update project dependencies:
1. Check for security vulnerabilities
2. Update major versions carefully
3. Test all functionality after updates
4. Update documentation if needed
5. Run full test suite
```

### Optimize Performance

```
Optimize application performance:
1. Analyze bundle size
2. Implement code splitting
3. Optimize images and assets
4. Review database queries
5. Implement caching strategies
```
