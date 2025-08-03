import { IsObject } from 'class-validator';
import { BaseAnalyticsDto, BaseAnalyticsResponseDto } from '../../../shared/base/base-analytics.dto';

export class CreateAnalyticsDto extends BaseAnalyticsDto {
  @IsObject()
  engagement: { likes: number; comments: number; shares: number };
}

export class AnalyticsResponseDto extends BaseAnalyticsResponseDto {
  engagement: { likes: number; comments: number; shares: number };
}