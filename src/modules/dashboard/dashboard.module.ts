import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsModule } from './analytics/analytics.module';
import { ReportsModule } from './reports/reports.module';
import { LoggerService } from '../../shared/logger/logger.service';

@Module({
  imports: [AnalyticsModule, ReportsModule],
  providers: [LoggerService],
})
export class DashboardModule {}