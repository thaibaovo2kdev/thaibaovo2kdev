import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { LessThanOrEqual, Repository } from 'typeorm';
import { RmqService } from 'src/rabbitmq/rmq.service';


@Injectable()
export class PostSchedulerTaskService {
  private readonly logger = new Logger(PostSchedulerTaskService.name);


  constructor(
    @InjectRepository(ScheduledPost)
    private readonly postRepo: Repository<ScheduledPost>,
    private readonly rmqService: RmqService
  ) {}


  // Chạy mỗi phút
  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledPosts() {
    const now = new Date();
    const posts = await this.postRepo.find({
      where: {
        status: 'pending',
        scheduleTime: LessThanOrEqual(now),
      },
      relations: ['account', 'account.user'],
    });


    for (const post of posts) {
      try {
        const client = this.rmqService.getClient();
        await client.emit('post.schedule', {
          postId: post.id,
          userId: post.account.user.id,
        }).toPromise();


        this.logger.log(`Scheduled post ${post.id} sent to queue`);
        post.status = 'posted'; // Đã gửi queue, chờ worker xử lý
        await this.postRepo.save(post);
      } catch (err) {
        this.logger.error(`Failed to enqueue scheduled post ${post.id}`, err);
      }
    }
  }
}
