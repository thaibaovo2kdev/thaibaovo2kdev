import { DynamicModule, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';
import { PermissionService } from '../../modules/permission/permission.service';

export function createSocialModule(
  entity: Type<any>,
  controller: Type<any>,
  service: Type<any>,
  handler: Type<any>,
): DynamicModule {
  return {
    module: class DynamicSocialModule {},
    imports: [TypeOrmModule.forFeature([entity])],
    controllers: [controller],
    providers: [service, handler, LoggerService, PermissionService],
    exports: [service],
  };
}