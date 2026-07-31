# API Sentinel

Production-oriented Foundation phase for an API governance platform. It includes local-service infrastructure, identity/authentication, database architecture, a reusable dashboard UI shell, and developer quality controls. Runtime monitoring, project management, OpenAPI uploads, analytics, and notifications are deliberately deferred to later roadmap tasks.

## Quick start

1. Install and start PostgreSQL 16+ and Redis 7+ on your machine.
2. Copy `.env.example` to the repository-root `.env` and replace both JWT secrets and the database password. Backend and Prisma commands load this single file automatically.
3. Create the `api_sentinel` PostgreSQL database and make its credentials match `DATABASE_URL`.
4. Install dependencies with `corepack pnpm install`.
5. Generate the database client and apply migration: `corepack pnpm db:generate` then `corepack pnpm db:migrate`.
6. Seed RBAC vocabulary: `corepack pnpm db:seed`.
7. Run applications: `corepack pnpm dev`.

Frontend: `http://localhost:3000`; API: `http://localhost:3001/api/v1`; Swagger: `http://localhost:3001/api/docs`; readiness: `http://localhost:3001/api/v1/health`.

## Quality commands

`corepack pnpm lint`, `corepack pnpm typecheck`, `corepack pnpm test`, `corepack pnpm build`, and `corepack pnpm format:check` correspond to the primary GitHub Actions checks. Root scripts invoke pnpm through Corepack so they work when Windows cannot install a global pnpm shim. Husky validates commit messages and code quality locally.
