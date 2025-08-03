import {
  Module,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

// Global Middleware
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseMiddleware } from './common/middlewares/response.middleware';

// Feature Modules
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { PermissionModule } from './modules/permission/permission.module';
import { SchedulerModule } from './modules/social-manager/content-scheduler/scheduler.module';
import { WorkersModule } from './rabbitmq/workers/workers.module';

// Entities
import { User } from './entities/user.entity';
import { SocialAccount } from './entities/social-account.entity';
import { ScheduledPost } from './entities/scheduled-post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    ScheduleModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'social_manager',
      synchronize: true,
      autoLoadEntities: true,
    }),

    TypeOrmModule.forFeature([User, SocialAccount, ScheduledPost]),

    // Modules
    DashboardModule,
    AnalyticsModule,
    PermissionModule,
    SchedulerModule,
    WorkersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseMiddleware).forRoutes('*');
  }
}
