import { Module } from '@nestjs/common';
import { LeaderboardsController } from './leaderboards.controller.js';
import { LeaderboardsService } from './leaderboards.service.js';

@Module({
  controllers: [LeaderboardsController],
  providers: [LeaderboardsService],
})
export class LeaderboardsModule {}
