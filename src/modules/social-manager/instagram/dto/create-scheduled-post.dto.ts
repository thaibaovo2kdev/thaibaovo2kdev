import {
    IsArray,
    IsISO8601,
    IsOptional,
    IsString,
    MaxLength,
    ArrayNotEmpty,
    IsUrl,
    IsUUID,
  } from 'class-validator';
 
  export class CreateScheduledPostDto {
    @IsUUID()
    accountId: string;
 
    @IsString()
    @MaxLength(2200)
    caption: string;
 
    @IsArray()
    @ArrayNotEmpty()
    @IsUrl({}, { each: true })
    mediaUrls: string[];
 
    @IsISO8601()
    scheduleTime: string;
 
    @IsOptional()
    @IsString()
    hashtags?: string;
  }
