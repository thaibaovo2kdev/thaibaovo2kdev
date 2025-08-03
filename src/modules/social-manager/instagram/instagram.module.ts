import { Module } from '@nestjs/common';
import { createSocialModule } from '../../../shared/base/base-social.module';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstagramHandler } from './instagram.handler';
import { InstagramAccount } from './instagram.entity';

@Module(createSocialModule(InstagramAccount, InstagramController, InstagramService, InstagramHandler))
export class InstagramModule {}