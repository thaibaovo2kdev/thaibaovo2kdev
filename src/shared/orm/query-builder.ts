import { SelectQueryBuilder } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { ObjectLiteral } from 'typeorm';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export class CustomQueryBuilder<T> {
  constructor(
    private queryBuilder: SelectQueryBuilder<T & ObjectLiteral>,
    private logger: LoggerService,
  ) {}

  filterByUser(userId: number): this {
    this.queryBuilder.andWhere('entity.userId = :userId', { userId });
    this.logger.log(`Applied user filter: ${userId}`);
    return this;
  }

  filterByTeam(teamId: number): this {
    this.queryBuilder.andWhere('entity.teamId = :teamId', { teamId });
    this.logger.log(`Applied team filter: ${teamId}`);
    return this;
  }

  filterByPlatform(platform: string): this {
    this.queryBuilder.andWhere('entity.platform = :platform', { platform });
    this.logger.log(`Applied platform filter: ${platform}`);
    return this;
  }

  withPagination({ page, limit }: PaginationOptions): this {
    this.queryBuilder.skip((page - 1) * limit).take(limit);
    this.logger.log(`Applied pagination: page ${page}, limit ${limit}`);
    return this;
  }

  async getManyCached(cacheKey: string): Promise<T[]> {
    this.logger.log(`Fetching from cache: ${cacheKey}`);
    return this.queryBuilder.cache(cacheKey, 60000).getMany();
  }

  getQuery(): SelectQueryBuilder<T & ObjectLiteral> {
    return this.queryBuilder;
  }
}