import { Injectable } from '@nestjs/common';
import { BaseSocialHandler } from '../../../shared/base/base-social.handler';
import { LoggerService } from '../../../shared/logger/logger.service';
import { PermissionService } from '../../../modules/permission/permission.service';

@Injectable()
export class InstagramHandler extends BaseSocialHandler {
  constructor(
    permissionService: PermissionService,
    logger: LoggerService,
  ) {
    super(permissionService, logger);
  }

  getPlatform(): string {
    return 'instagram';
  }
}