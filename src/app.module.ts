import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { DatabaseConfig } from './shared/config/database.config';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { PermissionModule } from './modules/permission/permission.module';
import { SocialManagerModule } from './modules/social-manager/social-manager.module';
import { LoggerService } from './shared/logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    EventEmitterModule.forRoot(),
    DashboardModule,
    PermissionModule,
    SocialManagerModule,
  ],
  providers: [LoggerService],
})
export class AppModule {}