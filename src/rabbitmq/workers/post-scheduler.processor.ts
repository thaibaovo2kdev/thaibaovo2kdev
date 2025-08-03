import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common';

@Processor('post.schedule')
export class PostSchedulerProcessor {
  private readonly logger = new Logger(PostSchedulerProcessor.name);

  constructor(
    @InjectRepository(ScheduledPost)
    private readonly postRepo: Repository<ScheduledPost>
  ) {}

  @Process()
  async handlePostSchedule(job: any) {
    const { postId, userId } = job.data;

    this.logger.log(`Processing scheduled post ${postId} for user ${userId}`);

    const post = await this.postRepo.findOne({
      where: { id: postId },
      relations: ['account', 'account.user'],
    });

    if (!post || post.account.user.id !== userId) {
      this.logger.warn(`Post or User not found or mismatched`);
      return;
    }

    // Giả lập đăng bài (hoặc gọi API Instagram thật)
    const isSuccess = Math.random() > 0.2;

    if (isSuccess) {
      post.status = 'posted';
    } else {
      post.status = 'failed';
    }

    await this.postRepo.save(post);
    this.logger.log(`Post ${postId} processed with status: ${post.status}`);
  }
}
