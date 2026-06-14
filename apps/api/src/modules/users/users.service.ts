import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { getDb, users } from '@soccerx/db';

@Injectable()
export class UsersService {
  private readonly db = getDb();

  async findOrCreateByClerk(clerkUserId: string, partial?: { email?: string; handle?: string }) {
    const found = await this.db.select().from(users).where(eq(users.clerkUserId, clerkUserId)).limit(1);
    if (found[0]) return found[0];

    const inserted = await this.db
      .insert(users)
      .values({ clerkUserId, email: partial?.email, handle: partial?.handle })
      .returning();

    return inserted[0];
  }
}
