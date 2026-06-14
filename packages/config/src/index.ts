import { config } from 'dotenv';
import { resolve } from 'path';
import { z } from 'zod';

config({ path: resolve(process.cwd(), '.env') });

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_PORT: z.coerce.number().default(4000),
  APP_ORIGIN: z.string().url(),
  API_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  CLERK_JWT_KEY: z.string().min(1).optional(),
  CLERK_AUTHORIZED_PARTIES: z.string().default('http://localhost:3000'),
  FOOTBALL_DATA_PROVIDER: z.string().default('api-football'),
  FOOTBALL_DATA_API_KEY: z.string().optional(),
  DEFAULT_TOURNAMENT_SLUG: z.string().default('wc2026'),
});

export type AppEnv = z.infer<typeof envSchema>;

let cachedEnv: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cachedEnv) return cachedEnv;
  cachedEnv = envSchema.parse(process.env);
  return cachedEnv;
}
