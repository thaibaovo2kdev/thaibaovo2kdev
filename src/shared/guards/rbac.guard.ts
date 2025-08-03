import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionService } from '../../modules/permission/permission.service';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionService: PermissionService,
    private logger: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resource = context.getClass().name.replace('Controller', '').toLowerCase();
    const action = context.getHandler().name;

    if (!user) {
      this.logger.warn(`No user found for request ${request['requestId']}`);
      throw new ForbiddenException('User not authenticated');
    }

    const hasPermission = await this.permissionService.checkPermission(user.id, resource, action);
    if (!hasPermission && !requiredRoles.includes(user.role)) {
      this.logger.warn(`Access denied for user ${user.id} on ${resource}:${action}`);
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}