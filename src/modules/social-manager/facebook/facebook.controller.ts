import { Controller } from '@nestjs/common';
import { BaseSocialController } from '../../../shared/base/base-social.controller';
import { FacebookService } from './facebook.service';
import { FacebookAccountDto, FacebookAccountResponseDto } from './facebook.dto';

@Controller('social-manager/facebook')
export class FacebookController extends BaseSocialController<FacebookAccountResponseDto, FacebookAccountDto> {
  constructor(service: FacebookService) {
    super(service);
  }
}