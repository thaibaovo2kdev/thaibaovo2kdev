import { Controller } from '@nestjs/common';
import { BaseSocialController } from '../../../shared/base/base-social.controller';
import { TikTokService } from './tiktok.service';
import { TikTokAccountDto, TikTokAccountResponseDto } from './tiktok.dto';

@Controller('social-manager/tiktok')
export class TikTokController extends BaseSocialController<TikTokAccountResponseDto, TikTokAccountDto> {
  constructor(service: TikTokService) {
    super(service);
  }
}