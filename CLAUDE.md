# CLAUDE.md - Fitness Tracker Dev Guide

## Commands
- `bun dev` - Start development server with turbo
- `bun build` - Build for production
- `bun check` - Run linting and type checking
- `bun lint` - Run Biome linter
- `bun lint:fix` - Fix linting issues
- `bun format:check` - Check formatting with Biome
- `bun format:write` - Fix formatting issues
- `bun typecheck` - Run TypeScript type checking
- `bun db:push` - Push schema changes to the database
- `bun db:seed` - Seed the database with initial data
- `bun db:reset` - Reset and reseed the database
- `bun db:studio` - Open Drizzle Studio to manage database

## Code Style
- Use tabs for indentation
- Use double quotes for strings
- Follow functional programming patterns; avoid classes
- Use PascalCase for components, camelCase for variables/functions
- Organize imports with Biome (automatically sorted)
- Use TypeScript with strict typing - avoid `any` type
- Prefer early returns for error conditions
- Handle all errors properly with user-friendly messages
- Use descriptive variable names with auxiliary verbs (isLoading, hasError)
- For file structure: export component first, then subcomponents, helpers, static content

## Component Guidelines
- Use server components by default, minimize `use client`
- Use Radix UI components with Tailwind styling
- Implement proper accessibility attributes
- Follow React best practices (hooks, memoization, error boundaries)