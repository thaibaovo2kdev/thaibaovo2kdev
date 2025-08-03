import { Controller, Post, Body, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RbacGuard } from '../guards/rbac.guard';
import { Roles } from '../decorators/roles.decorator';
import { ISocialAccount, ISocialAccountDto } from '../interfaces/social-account.interface';
import { PaginationOptions } from '../orm/query-builder';

@Controller()
@UseGuards(AuthGuard)
export abstract class BaseSocialController<T extends ISocialAccount, D extends ISocialAccountDto> {
  constructor(protected service: any) {}

  @Post()
  @Roles('admin', 'user')
  @UseGuards(RbacGuard)
  async create(@Body() dto: D, @Request() req): Promise<T> {
    return this.service.create(dto, req.user);
  }

  @Get()
  async getAccounts(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<T[]> {
    return this.service.getAccounts(req.user, { page, limit });
  }
}