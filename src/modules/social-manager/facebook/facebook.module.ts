import { Module } from '@nestjs/common';
import { createSocialModule } from '../../../shared/base/base-social.module';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { FacebookHandler } from './facebook.handler';
import { FacebookAccount } from './facebook.entity';

@Module(createSocialModule(FacebookAccount, FacebookController, FacebookService, FacebookHandler))
export class FacebookModule {}