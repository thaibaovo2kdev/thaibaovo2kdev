import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.dto';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { RbacGuard } from '../../shared/guards/rbac.guard';
import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('permissions')
@UseGuards(AuthGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RbacGuard)
  async create(@Body() dto: CreatePermissionDto) {
    return this.permissionService.create(dto);
  }
}