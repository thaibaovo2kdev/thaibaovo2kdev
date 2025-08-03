import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ISocialAccount, ISocialAccountDto } from '../interfaces/social-account.interface';

export class BaseSocialAccountDto implements ISocialAccountDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  teamId?: number;

  @IsString()
  username: string;

  @IsNumber()
  followers: number;
}

export class BaseSocialAccountResponseDto implements ISocialAccount {
  id: number;
  userId: number;
  teamId?: number;
  username: string;
  followers: number;
  platform: string;
}