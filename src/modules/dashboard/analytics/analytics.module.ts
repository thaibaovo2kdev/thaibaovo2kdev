import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsHandler } from './analytics.handler';
import { Analytics } from './analytics.entity';
import { LoggerService } from '../../../shared/logger/logger.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AnalyticsEventEmitter } from '../../../shared/events/analytics.event';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analytics]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsHandler, LoggerService, AnalyticsEventEmitter],
})
export class AnalyticsModule {}