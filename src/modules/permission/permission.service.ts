import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto } from './permission.dto';
import { LoggerService } from '../../shared/logger/logger.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private logger: LoggerService,
  ) {}

  async create(dto: CreatePermissionDto): Promise<Permission> {
    try {
      const permission = this.permissionRepository.create(dto);
      const saved = await this.permissionRepository.save(permission);
      this.logger.log(`Created permission for user ${dto.userId} on ${dto.resource}:${dto.action}`);
      return saved;
    } catch (error) {
      this.logger.error(`Failed to create permission: ${error.message}`, error.stack);
      throw error;
    }
  }

  async checkPermission(userId: number, resource: string, action: string): Promise<boolean> {
    const permission = await this.permissionRepository.findOne({ 
      where: { userId, resource, action },
      cache: true,
    });
    const hasPermission = !!permission;
    this.logger.log(`Permission check for user ${userId} on ${resource}:${action}: ${hasPermission}`);
    return hasPermission;
  }
}