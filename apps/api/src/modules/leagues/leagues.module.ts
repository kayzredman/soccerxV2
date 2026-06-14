import { Module } from '@nestjs/common';
import { LeaguesController } from './leagues.controller.js';
import { LeaguesService } from './leagues.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule {}
