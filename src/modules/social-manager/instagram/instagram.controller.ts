import { Controller } from '@nestjs/common';
import { BaseSocialController } from '../../../shared/base/base-social.controller';
import { InstagramService } from './instagram.service';
import { InstagramAccountDto, InstagramAccountResponseDto } from './instagram.dto';

@Controller('social-manager/instagram')
export class InstagramController extends BaseSocialController<InstagramAccountResponseDto, InstagramAccountDto> {
  constructor(service: InstagramService) {
    super(service);
  }
}