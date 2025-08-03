import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { SocialAccount } from 'src/entities/social-account.entity';
import { User } from 'src/entities/user.entity';
import { PostSchedulerProcessor } from './post-scheduler.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduledPost,
      SocialAccount,
      User,
    ]),
  ],
  providers: [PostSchedulerProcessor],
})
export class WorkersModule {
    constructor(private readonly postSchedulerProcessor: PostSchedulerProcessor) {
        this.postSchedulerProcessor.handlePostSchedule({
            postId: 1,
            userId: 1,
        });
    }
}
