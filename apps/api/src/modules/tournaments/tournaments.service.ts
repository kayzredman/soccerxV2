import { Injectable } from '@nestjs/common';
import { asc, eq } from 'drizzle-orm';
import { getDb, matches, teams, tournaments } from '@soccerx/db';
import { getEnv } from '@soccerx/config';

@Injectable()
export class TournamentsService {
  private readonly db = getDb();
  private readonly env = getEnv();

  async getDefaultTournament() {
    const rows = await this.db.select().from(tournaments).where(eq(tournaments.slug, this.env.DEFAULT_TOURNAMENT_SLUG)).limit(1);
    return rows[0] ?? null;
  }

  async listUpcomingMatches() {
    const tournament = await this.getDefaultTournament();
    if (!tournament) return [];

    return this.db
      .select({
        id: matches.id,
        stage: matches.stage,
        kickoffAt: matches.kickoffAt,
        status: matches.status,
        homeTeamId: matches.homeTeamId,
        awayTeamId: matches.awayTeamId,
      })
      .from(matches)
      .where(eq(matches.tournamentId, tournament.id))
      .orderBy(asc(matches.kickoffAt));
  }

  async listTeams() {
    const tournament = await this.getDefaultTournament();
    if (!tournament) return [];
    return this.db.select().from(teams).where(eq(teams.tournamentId, tournament.id)).orderBy(asc(teams.name));
  }
}
