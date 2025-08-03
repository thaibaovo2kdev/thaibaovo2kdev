import { IsObject } from 'class-validator';
import { BaseAnalyticsDto, BaseAnalyticsResponseDto } from '../../../shared/base/base-analytics.dto';

export class CreateReportDto extends BaseAnalyticsDto {
  @IsObject()
  performance: { reach: number; impressions: number };
}

export class ReportResponseDto extends BaseAnalyticsResponseDto {
  performance: { reach: number; impressions: number };
}