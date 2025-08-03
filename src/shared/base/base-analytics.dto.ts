import { IsNumber, IsString } from 'class-validator';

export class BaseAnalyticsDto {
  @IsNumber()
  accountId: number;

  @IsString()
  platform: string;
}

export class BaseAnalyticsResponseDto {
  id: number;
  accountId: number;
  platform: string;
  createdAt: Date;
}