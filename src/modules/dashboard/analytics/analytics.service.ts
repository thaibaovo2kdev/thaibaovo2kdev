import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analytics } from './analytics.entity';
import { CreateAnalyticsDto, AnalyticsResponseDto } from './analytics.dto';
import { AnalyticsHandler } from './analytics.handler';
import { LoggerService } from '../../../shared/logger/logger.service';
import { AnalyticsEventEmitter } from '../../../shared/events/analytics.event';
import { OnEvent } from '@nestjs/event-emitter';
import { classToPlain } from 'class-transformer';
import { CustomQueryBuilder, PaginationOptions } from '../../../shared/orm/query-builder';

@Injectable()
export class AnalyticsService implements OnModuleInit {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
    private handler: AnalyticsHandler,
    private logger: LoggerService,
    private eventEmitter: AnalyticsEventEmitter,
  ) {}

  onModuleInit() {
    this.logger.log('AnalyticsService initialized');
  }

  async create(dto: CreateAnalyticsDto, user: any): Promise<AnalyticsResponseDto> {
    await this.handler.validateAccess(dto.accountId, user);
    const analytics = this.analyticsRepository.create({
      ...dto,
      createdAt: new Date(),
    });
    const saved = await this.analyticsRepository.save(analytics);
    this.eventEmitter.emitAnalyticsUpdate(dto.accountId, dto.platform, dto.engagement);
    this.logger.log(`Created analytics for account ${dto.accountId} on ${dto.platform}`);
    return classToPlain(saved) as AnalyticsResponseDto;
  }

  async getAnalytics(user: any, pagination: PaginationOptions): Promise<AnalyticsResponseDto[]> {
    const qb = new CustomQueryBuilder(this.analyticsRepository.createQueryBuilder('analytics'), this.logger);
    
    if (user.role === 'user') {
      qb.filterByUser(user.id);
    } else if (user.role === 'manager') {
      qb.filterByTeam(user.teamId);
    }

    const analytics = await qb.withPagination(pagination).getManyCached(`analytics:${user.id}`);
    return classToPlain(analytics) as AnalyticsResponseDto[];
  }

  @OnEvent('analytics.update')
  async handleAnalyticsUpdate(payload: { accountId: number; platform: string; data: any }) {
    const metrics = await this.handler.calculateEngagementMetrics(payload.accountId, payload.platform);
    this.logger.log(`Updated analytics metrics for account ${payload.accountId}: ${JSON.stringify(metrics)}`);
  }
}