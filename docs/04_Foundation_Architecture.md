# Foundation Architecture

## Overview

API Sentinel uses a pnpm workspace monorepo. `apps/backend` owns HTTP APIs and persistence, `apps/frontend` owns the Next.js dashboard shell, and `packages/shared` holds framework-neutral transport contracts.

## Backend boundaries

NestJS modules compose at `src/app.module.ts`. Controllers are transport adapters, services hold application use cases, and repositories are the only callers of Prisma. The Foundation phase contains only `auth`, `database`, and `health` modules.

Authentication issues signed access tokens and rotating refresh sessions. Refresh tokens are hashed at rest; a JWT `jti` selects a session and bcrypt verifies the opaque token before rotation. Default roles and permissions are seeded separately from registration.

## Frontend boundaries

The Next.js App Router is under `apps/frontend/src/app`. Reusable visual primitives use shadcn/ui composition conventions under `src/components/ui`; the dashboard shell lives in `src/components/layout`. Pages intentionally contain no monitoring or project-management behavior.

## Local services and security

PostgreSQL 16+ and Redis 7+ run as local services. Their connection strings are supplied through environment variables and validated during backend startup. Global input validation, a safe exception filter, structured logging, Swagger at `/api/docs`, and readiness at `/api/v1/health` establish operational defaults.
