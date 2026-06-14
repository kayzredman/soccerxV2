# SoccerX Backend Phase Overlay

This package is designed to be **merged into the previous SoccerX starter root**.

It adds:
- `apps/api` — NestJS + Fastify API
- `packages/db` — Drizzle schema and db client
- `packages/config` — Zod-validated environment loading
- `packages/types` — shared zod schemas and types
- `workers/scoring` — BullMQ scoring hook scaffold
- `apps/web` Clerk integration overlays

## Merge flow
1. Extract this archive into the same root as your SoccerX starter.
2. Allow files under `apps/web/` to overwrite the previous versions.
3. Run `pnpm install` from the repository root.
4. Copy `.env.api.example` to `.env` and fill values.
5. Generate Drizzle migrations, then run the API.

## Root commands after merge
```bash
pnpm install
pnpm --filter @soccerx/api dev
pnpm --filter @soccerx/scoring-worker dev
```

## What changed
- Auth now uses **Clerk**, per your latest instruction.
- The API is built on **NestJS with Fastify**.
- Database access uses **Drizzle + PostgreSQL**.
- Scoring is scaffolded as a **separate BullMQ worker** with queue-first hooks.
