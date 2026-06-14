import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createLeagueSchema, joinLeagueSchema } from '@soccerx/types';
import { LeaguesService } from './leagues.service.js';
import { CurrentUser } from '../auth/current-user.decorator.js';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post()
  create(@CurrentUser('clerkUserId') clerkUserId: string, @Body() body: unknown) {
    return this.leaguesService.create(clerkUserId, createLeagueSchema.parse(body));
  }

  @Post('join')
  join(@CurrentUser('clerkUserId') clerkUserId: string, @Body() body: unknown) {
    return this.leaguesService.join(clerkUserId, joinLeagueSchema.parse(body));
  }

  @Get(':code')
  getByCode(@Param('code') code: string) {
    return this.leaguesService.getByCode(code);
  }
}
