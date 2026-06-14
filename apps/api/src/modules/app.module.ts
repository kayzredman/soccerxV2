import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module.js';
import { ClerkAuthModule } from './auth/clerk-auth.module.js';
import { UsersModule } from './users/users.module.js';
import { TournamentsModule } from './tournaments/tournaments.module.js';
import { PicksModule } from './picks/picks.module.js';
import { LeaguesModule } from './leagues/leagues.module.js';
import { LeaderboardsModule } from './leaderboards/leaderboards.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClerkAuthModule,
    HealthModule,
    UsersModule,
    TournamentsModule,
    PicksModule,
    LeaguesModule,
    LeaderboardsModule,
  ],
})
export class AppModule {}
