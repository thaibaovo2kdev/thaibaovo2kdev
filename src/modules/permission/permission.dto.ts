import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  @IsOptional()
  teamId?: number;

  @IsEnum(['admin', 'manager', 'user'])
  role: string;

  @IsString()
  resource: string;

  @IsString()
  action: string;
}