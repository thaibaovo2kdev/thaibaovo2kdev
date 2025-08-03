import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseSocialService } from '../../../shared/base/base-social.service';
import { TikTokAccount } from './tiktok.entity';
import { TikTokAccountDto } from './tiktok.dto';
import { TikTokHandler } from './tiktok.handler';
import { LoggerService } from '../../../shared/logger/logger.service';
import { PermissionService } from '../../../modules/permission/permission.service';

@Injectable()
export class TikTokService extends BaseSocialService<TikTokAccount, TikTokAccountDto> {
  constructor(
    @InjectRepository(TikTokAccount)
    repository: Repository<TikTokAccount>,
    handler: TikTokHandler,
    logger: LoggerService,
    permissionService: PermissionService,
  ) {
    super(repository, handler, logger, permissionService);
  }

  getPlatform(): string {
    return 'tiktok';
  }
}