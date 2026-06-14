# Backend phase notes

## Architecture choices reflected here
- **NestJS on Fastify** for the API shell
- **Drizzle + PostgreSQL** for schema, migrations, and type-safe access
- **Clerk** for authentication, using bearer-token verification on the API side
- **BullMQ worker** for scoring and leaderboard refresh hooks

## Important implementation note
The worker currently includes **scoring hooks**, not the full final scoring matrix. The queue boundaries and idempotency pattern are scaffolded so you can expand the logic from the SoccerX rules document without redesigning the system.

## Suggested order after merge
1. Fill `.env`
2. Start Postgres and Redis
3. Run Drizzle generate / migrate
4. Start API
5. Start worker
6. Connect authenticated web mutations to API endpoints
