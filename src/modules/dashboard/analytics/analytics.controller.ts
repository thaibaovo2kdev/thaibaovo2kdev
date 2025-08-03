import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto, AnalyticsResponseDto } from './analytics.dto';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RbacGuard } from '../../../shared/guards/rbac.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';

@Controller('dashboard/analytics')
@UseGuards(AuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Post()
  @Roles('admin', 'manager')
  @UseGuards(RbacGuard)
  async create(@Body() dto: CreateAnalyticsDto, @Request() req): Promise<AnalyticsResponseDto> {
    return this.analyticsService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'manager', 'user')
  @UseGuards(RbacGuard)
  async getAnalytics(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<AnalyticsResponseDto[]> {
    return this.analyticsService.getAnalytics(req.user, { page, limit });
  }
}