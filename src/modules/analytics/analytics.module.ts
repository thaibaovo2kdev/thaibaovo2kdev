import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduledPost])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
