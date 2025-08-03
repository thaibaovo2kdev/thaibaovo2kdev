import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { PermissionService } from '../../modules/permission/permission.service';
import { ISocialAccountDto } from '../interfaces/social-account.interface';

@Injectable()
export abstract class BaseSocialHandler {
  constructor(
    protected permissionService: PermissionService,
    protected logger: LoggerService,
  ) {}

  async validateCreation(dto: ISocialAccountDto, user: any): Promise<void> {
    if (user.role !== 'admin' && user.id !== dto.userId) {
      this.logger.warn(`Unauthorized attempt to create account by user ${user.id}`);
      throw new ForbiddenException('Unauthorized to create account for another user');
    }

    const hasPermission = await this.permissionService.checkPermission(user.id, this.getPlatform(), 'create');
    if (!hasPermission && user.role !== 'admin') {
      this.logger.warn(`Permission denied for user ${user.id} to create ${this.getPlatform()} account`);
      throw new ForbiddenException('Insufficient permissions');
    }
  }

  abstract getPlatform(): string;
}