import { Injectable, NotFoundException } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { getDb, leagueMembers, leagues } from '@soccerx/db';
import { CreateLeagueInput, JoinLeagueInput } from '@soccerx/types';
import { UsersService } from '../users/users.service.js';

function generateInviteCode() {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
}

@Injectable()
export class LeaguesService {
  private readonly db = getDb();

  constructor(private readonly usersService: UsersService) {}

  async create(clerkUserId: string, input: CreateLeagueInput) {
    const user = await this.usersService.findOrCreateByClerk(clerkUserId);
    const created = await this.db
      .insert(leagues)
      .values({
        ownerUserId: user.id,
        name: input.name,
        code: generateInviteCode(),
      })
      .returning();

    await this.db.insert(leagueMembers).values({ leagueId: created[0].id, userId: user.id });
    return created[0];
  }

  async join(clerkUserId: string, input: JoinLeagueInput) {
    const user = await this.usersService.findOrCreateByClerk(clerkUserId);
    const found = await this.db.select().from(leagues).where(eq(leagues.code, input.code)).limit(1);
    if (!found[0]) throw new NotFoundException('League not found');

    await this.db
      .insert(leagueMembers)
      .values({ leagueId: found[0].id, userId: user.id })
      .onConflictDoNothing();

    return found[0];
  }

  async getByCode(code: string) {
    const rows = await this.db.select().from(leagues).where(eq(leagues.code, code.toUpperCase())).limit(1);
    if (!rows[0]) throw new NotFoundException('League not found');
    return rows[0];
  }
}
