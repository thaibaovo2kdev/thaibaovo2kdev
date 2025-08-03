import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto, ReportResponseDto } from './reports.dto';
import { AuthGuard } from '../../../shared/guards/auth.guard';
import { RbacGuard } from '../../../shared/guards/rbac.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';

@Controller('dashboard/reports')
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @Roles('admin', 'manager')
  @UseGuards(RbacGuard)
  async create(@Body() dto: CreateReportDto, @Request() req): Promise<ReportResponseDto> {
    return this.reportsService.create(dto, req.user);
  }

  @Get()
  @Roles('admin', 'manager', 'user')
  @UseGuards(RbacGuard)
  async getReports(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<ReportResponseDto[]> {
    return this.reportsService.getReports(req.user, { page, limit });
  }
}