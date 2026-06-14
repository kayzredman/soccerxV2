import { Module } from '@nestjs/common';
import { PicksController } from './picks.controller.js';
import { PicksService } from './picks.service.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [UsersModule],
  controllers: [PicksController],
  providers: [PicksService],
})
export class PicksModule {}
