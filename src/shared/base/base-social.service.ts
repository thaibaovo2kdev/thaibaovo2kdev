import { Injectable, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoggerService } from '../logger/logger.service';
import { PermissionService } from '../../modules/permission/permission.service';
import { CustomQueryBuilder, PaginationOptions } from '../orm/query-builder';
import { ISocialAccount, ISocialAccountDto } from '../interfaces/social-account.interface';
import { classToPlain } from 'class-transformer';

@Injectable()
export abstract class BaseSocialService<T extends ISocialAccount, D extends ISocialAccountDto> {
  constructor(
    protected repository: Repository<T>,
    protected handler: any,
    protected logger: LoggerService,
    protected permissionService: PermissionService,
  ) {}

  async create(dto: D, user: any): Promise<T> {
    await this.handler.validateCreation(dto, user);
    const account = this.repository.create({ ...dto, platform: this.getPlatform() } as any);
    const saved = await this.repository.save(account);
    this.logger.log(`Created ${this.getPlatform()} account for user ${dto.userId}`);
    return classToPlain(saved) as T;
  }

  async getAccounts(user: any, pagination: PaginationOptions): Promise<T[]> {
    const qb = new CustomQueryBuilder(this.repository.createQueryBuilder('account'), this.logger);
    
    if (user.role === 'user') {
      qb.filterByUser(user.id);
    } else if (user.role === 'manager') {
      qb.filterByTeam(user.teamId);
    }

    qb.filterByPlatform(this.getPlatform());
    const accounts = await qb.withPagination(pagination).getManyCached(`${this.getPlatform()}:accounts:${user.id}`);
    return classToPlain(accounts) as T[];
  }

  abstract getPlatform(): string;
}