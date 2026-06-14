import {
  pgSchema,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';

export const soccerx = pgSchema('soccerx');

export const matchStatusEnum = soccerx.enum('match_status', [
  'SCHEDULED', 'LIVE', 'FINISHED', 'CANCELED', 'POSTPONED',
]);

export const matchStageEnum = soccerx.enum('match_stage', [
  'GROUP', 'R32', 'R16', 'QF', 'SF', 'FINAL', 'THIRD_PLACE',
]);

export const tournaments = soccerx.table('tournaments', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 32 }).notNull(),
  name: varchar('name', { length: 128 }).notNull(),
  startsAt: timestamp('starts_at', { withTimezone: true }).notNull(),
  endsAt: timestamp('ends_at', { withTimezone: true }).notNull(),
  format: varchar('format', { length: 32 }).notNull().default('48-team'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const groups = soccerx.table('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').notNull().references(function() { return tournaments.id; }),
  letter: varchar('letter', { length: 2 }).notNull(),
});

export const teams = soccerx.table('teams', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').notNull().references(function() { return tournaments.id; }),
  name: varchar('name', { length: 128 }).notNull(),
  code: varchar('code', { length: 8 }).notNull(),
  flagEmoji: varchar('flag_emoji', { length: 16 }).notNull().default(''),
  groupId: uuid('group_id').references(function() { return groups.id; }),
});

export const users = soccerx.table('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: varchar('clerk_id', { length: 64 }).notNull(),
  displayName: varchar('display_name', { length: 128 }).notNull(),
  avatarUrl: text('avatar_url'),
  role: varchar('role', { length: 16 }).notNull().default('player'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const matches = soccerx.table('matches', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').notNull().references(function() { return tournaments.id; }),
  stage: matchStageEnum('stage').notNull().default('GROUP'),
  kickoffAt: timestamp('kickoff_at', { withTimezone: true }).notNull(),
  venue: varchar('venue', { length: 256 }),
  homeTeamId: uuid('home_team_id').references(function() { return teams.id; }),
  awayTeamId: uuid('away_team_id').references(function() { return teams.id; }),
  homeScore: integer('home_score'),
  awayScore: integer('away_score'),
  status: matchStatusEnum('status').notNull().default('SCHEDULED'),
  externalRef: varchar('external_ref', { length: 128 }),
  meta: jsonb('meta').default({}),
});

export const leagues = soccerx.table('leagues', {
  id: uuid('id').primaryKey().defaultRandom(),
  tournamentId: uuid('tournament_id').notNull().references(function() { return tournaments.id; }),
  name: varchar('name', { length: 128 }).notNull(),
  slug: varchar('slug', { length: 64 }).notNull(),
  inviteCode: varchar('invite_code', { length: 16 }).notNull(),
  createdBy: uuid('created_by').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const picks = soccerx.table('picks', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(function() { return users.id; }),
  matchId: uuid('match_id').notNull().references(function() { return matches.id; }),
  leagueId: uuid('league_id').notNull().references(function() { return leagues.id; }),
  predictedHome: integer('predicted_home').notNull(),
  predictedAway: integer('predicted_away').notNull(),
  points: integer('points'),
  lockedAt: timestamp('locked_at', { withTimezone: true }).notNull(),
});

export const scoreEvents = soccerx.table('score_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  pickId: uuid('pick_id').notNull().references(function() { return picks.id; }),
  matchId: uuid('match_id').notNull().references(function() { return matches.id; }),
  userId: uuid('user_id').notNull().references(function() { return users.id; }),
  leagueId: uuid('league_id').notNull().references(function() { return leagues.id; }),
  ruleCode: varchar('rule_code', { length: 32 }).notNull(),
  delta: integer('delta').notNull(),
  reason: text('reason'),
  scoredAt: timestamp('scored_at', { withTimezone: true }).notNull().defaultNow(),
  meta: jsonb('meta').default({}),
});

export const leagueMembers = soccerx.table('league_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  leagueId: uuid('league_id').notNull().references(function() { return leagues.id; }),
  userId: uuid('user_id').notNull().references(function() { return users.id; }),
});

export const leaderboardCache = soccerx.table('leaderboard_cache', {
  id: uuid('id').primaryKey().defaultRandom(),
  leagueId: uuid('league_id').notNull().references(function() { return leagues.id; }),
  userId: uuid('user_id').notNull(),
  totalPoints: integer('total_points').notNull().default(0),
  rank: integer('rank').notNull().default(0),
  correctOutcomes: integer('correct_outcomes').notNull().default(0),
  exactScores: integer('exact_scores').notNull().default(0),
});
