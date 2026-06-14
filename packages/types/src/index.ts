import { z } from 'zod';

export type MatchStatus = 'SCHEDULED' | 'LIVE' | 'FINISHED' | 'CANCELED' | 'POSTPONED';
export type MatchStage = 'GROUP' | 'R32' | 'R16' | 'QF' | 'SF' | 'FINAL' | 'THIRD_PLACE';

export var stageEnum = z.enum(['GROUP', 'R32', 'R16', 'QF', 'SF', 'FINAL', 'THIRD_PLACE']);

export var pickTypeEnum = z.enum([
  'group_winner', 'group_runner_up', 'best_third',
  'r32', 'r16', 'qf', 'sf', 'final', 'champion',
  'daily_first_scorer', 'daily_over_under',
  'daily_red_card', 'daily_half_time_scoreline'
]);

export var createLeagueSchema = z.object({
  name: z.string().min(3).max(80)
});

export var joinLeagueSchema = z.object({
  code: z.string().length(8).transform(function(v) { return v.toUpperCase(); })
});

export var upsertPickSchema = z.object({
  tournamentId: z.string().uuid(),
  pickType: pickTypeEnum,
  matchId: z.string().uuid().nullable().optional(),
  teamId: z.string().uuid().nullable().optional(),
  scalarValue: z.string().nullable().optional()
});

export type CreateLeagueInput = z.infer<typeof createLeagueSchema>;
export type JoinLeagueInput = z.infer<typeof joinLeagueSchema>;
export type UpsertPickInput = z.infer<typeof upsertPickSchema>;
