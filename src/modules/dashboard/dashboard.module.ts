import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { User } from 'src/entities/user.entity';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ScheduledPost])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
