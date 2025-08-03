import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('post-performance')
  getPostPerformance(@Query('accountId') accountId: string) {
    return this.analyticsService.getPostPerformance(accountId);
  }
}
