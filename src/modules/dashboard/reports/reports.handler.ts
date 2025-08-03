import { Injectable, ForbiddenException } from '@nestjs/common';
import { LoggerService } from '../../../shared/logger/logger.service';
import { PermissionService } from '../../../modules/permission/permission.service';

@Injectable()
export class ReportsHandler {
  constructor(
    private logger: LoggerService,
    private permissionService: PermissionService,
  ) {}

  async validateAccess(accountId: number, user: any): Promise<void> {
    const hasPermission = await this.permissionService.checkPermission(user.id, 'reports', 'create');
    if (!hasPermission && user.role !== 'admin' && user.id !== accountId) {
      this.logger.warn(`Access denied for user ${user.id} to create report for account ${accountId}`);
      throw new ForbiddenException('Insufficient permissions');
    }
  }
}