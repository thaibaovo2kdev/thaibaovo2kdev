import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './reports.entity';
import { CreateReportDto, ReportResponseDto } from './reports.dto';
import { ReportsHandler } from './reports.handler';
import { LoggerService } from '../../../shared/logger/logger.service';
import { classToPlain } from 'class-transformer';
import { CustomQueryBuilder, PaginationOptions } from '../../../shared/orm/query-builder';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
    private handler: ReportsHandler,
    private logger: LoggerService,
  ) {}

  async create(dto: CreateReportDto, user: any): Promise<ReportResponseDto> {
    await this.handler.validateAccess(dto.accountId, user);
    const report = this.reportsRepository.create({
      ...dto,
      createdAt: new Date(),
    });
    const saved = await this.reportsRepository.save(report);
    this.logger.log(`Created report for account ${dto.accountId} on ${dto.platform}`);
    return classToPlain(saved) as ReportResponseDto;
  }

  async getReports(user: any, pagination: PaginationOptions): Promise<ReportResponseDto[]> {
    const qb = new CustomQueryBuilder(this.reportsRepository.createQueryBuilder('report'), this.logger);
    
    if (user.role === 'user') {
      qb.filterByUser(user.id);
    } else if (user.role === 'manager') {
      qb.filterByTeam(user.teamId);
    }

    const reports = await qb.withPagination(pagination).getManyCached(`reports:${user.id}`);
    return classToPlain(reports) as ReportResponseDto[];
  }
}