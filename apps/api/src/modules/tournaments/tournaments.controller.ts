import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator.js';
import { eq, asc } from 'drizzle-orm';
import { getDb, tournaments, teams, matches } from '@soccerx/db';

var DEFAULT_SLUG = 'wc2026';

@Controller('tournaments')
export class TournamentsController {
  @Public()
  @Get('default')
  async defaultTournament() {
    var db = getDb();
    var rows = await db.select().from(tournaments).where(eq(tournaments.slug, DEFAULT_SLUG)).limit(1);
    return rows[0] || null;
  }

  @Public()
  @Get('default/teams')
  async listTeams() {
    var db = getDb();
    var tournament = await db.select().from(tournaments).where(eq(tournaments.slug, DEFAULT_SLUG)).limit(1);
    if (!tournament[0]) return [];
    return db.select().from(teams).where(eq(teams.tournamentId, tournament[0].id)).orderBy(asc(teams.name));
  }

  @Public()
  @Get('default/matches')
  async listMatches() {
    var db = getDb();
    var tournament = await db.select().from(tournaments).where(eq(tournaments.slug, DEFAULT_SLUG)).limit(1);
    if (!tournament[0]) return [];
    return db.select().from(matches).where(eq(matches.tournamentId, tournament[0].id)).orderBy(asc(matches.kickoffAt));
  }
}
