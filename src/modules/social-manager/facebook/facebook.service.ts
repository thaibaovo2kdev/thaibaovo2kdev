import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseSocialService } from '../../../shared/base/base-social.service';
import { FacebookAccount } from './facebook.entity';
import { FacebookAccountDto } from './facebook.dto';
import { FacebookHandler } from './facebook.handler';
import { LoggerService } from '../../../shared/logger/logger.service';
import { PermissionService } from '../../../modules/permission/permission.service';

@Injectable()
export class FacebookService extends BaseSocialService<FacebookAccount, FacebookAccountDto> {
  constructor(
    @InjectRepository(FacebookAccount)
    repository: Repository<FacebookAccount>,
    handler: FacebookHandler,
    logger: LoggerService,
    permissionService: PermissionService,
  ) {
    super(repository, handler, logger, permissionService);
  }

  getPlatform(): string {
    return 'facebook';
  }
}