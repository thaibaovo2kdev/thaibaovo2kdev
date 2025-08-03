import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { SocialAccount } from 'src/entities/social-account.entity';
import { ContentSchedulerService } from './scheduler.service';
import { RmqModule } from 'src/rabbitmq/rmq.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduledPost, SocialAccount]),
    RmqModule,
  ],
  providers: [ContentSchedulerService],
  exports: [ContentSchedulerService],
})
export class SchedulerModule {}
