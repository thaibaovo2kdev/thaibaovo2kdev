import { Module } from '@nestjs/common';
import { InstagramModule } from './instagram/instagram.module';
import { FacebookModule } from './facebook/facebook.module';
import { TikTokModule } from './tiktok/tiktok.module';

@Module({
  imports: [InstagramModule, FacebookModule, TikTokModule],
})
export class SocialManagerModule {}