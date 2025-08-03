import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ReportsHandler } from './reports.handler';
import { Report } from './reports.entity';
import { LoggerService } from '../../../shared/logger/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsHandler, LoggerService],
})
export class ReportsModule {}