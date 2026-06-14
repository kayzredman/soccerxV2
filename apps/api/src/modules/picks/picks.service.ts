import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { getDb, matches, picks, scoreEvents, tournaments, users } from '@soccerx/db';
import { UpsertPickInput } from '@soccerx/types';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class PicksService {
  private readonly db = getDb();

  constructor(private readonly usersService: UsersService) {}

  private async resolveLockAt(input: UpsertPickInput) {
    if (input.matchId) {
      const matchRows = await this.db.select().from(matches).where(eq(matches.id, input.matchId)).limit(1);
      if (!matchRows[0]) throw new BadRequestException('Match not found');
      return matchRows[0].kickoffAt;
    }

    const tournamentRows = await this.db.select().from(tournaments).where(eq(tournaments.id, input.tournamentId)).limit(1);
    if (!tournamentRows[0]) throw new BadRequestException('Tournament not found');
    return tournamentRows[0].startsAt;
  }

  async upsert(clerkUserId: string, input: UpsertPickInput) {
    const appUser = await this.usersService.findOrCreateByClerk(clerkUserId);
    const lockedAt = await this.resolveLockAt(input);

    if (new Date(lockedAt).getTime() <= Date.now()) {
      throw new ConflictException('Pick is locked');
    }

    const existing = await this.db
      .select()
      .from(picks)
      .where(
        and(
          eq(picks.userId, appUser.id),
          eq(picks.tournamentId, input.tournamentId),
          eq(picks.pickType, input.pickType),
          input.matchId ? eq(picks.matchId, input.matchId) : eq(picks.matchId, null as any),
        ),
      )
      .limit(1);

    if (existing[0]) {
      const updated = await this.db
        .update(picks)
        .set({ teamId: input.teamId ?? null, scalarValue: input.scalarValue ?? null, lockedAt })
        .where(eq(picks.id, existing[0].id))
        .returning();
      return updated[0];
    }

    const inserted = await this.db
      .insert(picks)
      .values({
        userId: appUser.id,
        tournamentId: input.tournamentId,
        pickType: input.pickType,
        matchId: input.matchId ?? null,
        teamId: input.teamId ?? null,
        scalarValue: input.scalarValue ?? null,
        lockedAt,
      })
      .returning();

    return inserted[0];
  }

  async myScore(clerkUserId: string) {
    const appUser = await this.usersService.findOrCreateByClerk(clerkUserId);
    const events = await this.db.select().from(scoreEvents).where(eq(scoreEvents.userId, appUser.id));
    const total = events.reduce((sum, row) => sum + row.points, 0);
    return { total, events };
  }
}
