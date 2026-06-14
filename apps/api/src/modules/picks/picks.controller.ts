import { Body, Controller, Get, Post } from '@nestjs/common';
import { upsertPickSchema } from '@soccerx/types';
import { PicksService } from './picks.service.js';
import { CurrentUser } from '../auth/current-user.decorator.js';

@Controller('picks')
export class PicksController {
  constructor(private readonly picksService: PicksService) {}

  @Post()
  async upsert(
    @CurrentUser('clerkUserId') clerkUserId: string,
    @Body() body: unknown,
  ) {
    const input = upsertPickSchema.parse(body);
    return this.picksService.upsert(clerkUserId, input);
  }

  @Get('me/score')
  myScore(@CurrentUser('clerkUserId') clerkUserId: string) {
    return this.picksService.myScore(clerkUserId);
  }
}
