import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { LeaderboardsService } from './leaderboards.service.js';
import { Public } from '../auth/public.decorator.js';

@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private readonly leaderboardsService: LeaderboardsService) {}

  @Public()
  @Get('global')
  global(@Query('limit') limit?: string) {
    return this.leaderboardsService.global(limit ? Number(limit) : 50);
  }

  @Public()
  @Get('league/:leagueId')
  league(@Param('leagueId') leagueId: string, @Query('limit') limit?: string) {
    return this.leaderboardsService.forLeague(leagueId, limit ? Number(limit) : 50);
  }
}
