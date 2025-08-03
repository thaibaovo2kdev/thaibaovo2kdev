import { Module } from '@nestjs/common';
import { createSocialModule } from '../../../shared/base/base-social.module';
import { TikTokController } from './tiktok.controller';
import { TikTokService } from './tiktok.service';
import { TikTokHandler } from './tiktok.handler';
import { TikTokAccount } from './tiktok.entity';

@Module(createSocialModule(TikTokAccount, TikTokController, TikTokService, TikTokHandler))
export class TikTokModule {}