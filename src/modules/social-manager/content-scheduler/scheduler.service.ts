import {
    BadRequestException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { ScheduledPost } from 'src/entities/scheduled-post.entity';
  import { SocialAccount } from 'src/entities/social-account.entity';
  import { CreateScheduledPostDto } from '../instagram/dto/create-scheduled-post.dto';
  import { UpdateScheduledPostDto } from '../instagram/dto/update-scheduled-post.dto';
  import { RmqService } from 'src/rabbitmq/rmq.service';
 
  @Injectable()
  export class ContentSchedulerService {
    private readonly logger = new Logger(ContentSchedulerService.name);
 
    constructor(
      @InjectRepository(ScheduledPost)
      private readonly postRepo: Repository<ScheduledPost>,
 
      @InjectRepository(SocialAccount)
      private readonly accountRepo: Repository<SocialAccount>,
 
      private readonly rmqService: RmqService
    ) {}
 
    async scheduleSinglePost(dto: CreateScheduledPostDto): Promise<ScheduledPost> {
      const scheduleTime = new Date(dto.scheduleTime);
      if (scheduleTime <= new Date()) {
        throw new BadRequestException('SCHEDULE_TIME_MUST_BE_IN_FUTURE');
      }
 
      if (!dto.caption || dto.caption.length > 2200) {
        throw new BadRequestException('INVALID_CAPTION');
      }
 
      if (!dto.mediaUrls || !Array.isArray(dto.mediaUrls) || dto.mediaUrls.length === 0) {
        throw new BadRequestException('MEDIA_REQUIRED');
      }
 
      const account = await this.accountRepo.findOne({
        where: { id: dto.accountId as any },
        relations: ['user'],
      });
 
      if (!account) {
        throw new NotFoundException('ACCOUNT_NOT_FOUND');
      }
 
      const post = this.postRepo.create({
        caption: dto.caption,
        mediaUrls: dto.mediaUrls,
        scheduleTime,
        hashtags: dto.hashtags,
        status: 'pending',
        account,
      } as any);
 
      const savedPost:any = await this.postRepo.save(post);
 
      try {
        await this.enqueuePost(savedPost.id.toString(), account.user.id.toString());
      } catch (err) {
        this.logger.error(`Failed to enqueue post ${savedPost?.id}`, err);
        savedPost.status = 'failed' as any;
        await this.postRepo.save(savedPost);
      }
 
      return savedPost;
    }
 
    async scheduleMultiplePosts(dtos: CreateScheduledPostDto[]): Promise<any[]> {
      const results: any[] = [];
 
      for (const dto of dtos) {
        try {
          const result : any = await this.scheduleSinglePost(dto);
          results.push({ success: true, data: result });
        } catch (error) {
          results.push({
            success: false,
            message: error.message || 'UNKNOWN_ERROR',
          });
        }
      }
 
      return results;
    }
 
    async enqueuePost(postId: string, userId: string): Promise<void> {
      const client = this.rmqService.getClient();
      await client.emit('post.schedule', { postId, userId }).toPromise();
      this.logger.log(`Enqueued post ${postId} for user ${userId}`);
    }
 
    async retryFailedPosts(): Promise<void> {
      const failedPosts = await this.postRepo.find({
        where: { status: 'failed' },
        relations: ['account', 'account.user'],
      });
 
      for (const post of failedPosts) {
        try {
          await this.enqueuePost(post.id.toString(), post.account.user.id.toString());
          post.status = 'pending' as any;
          await this.postRepo.save(post);
        } catch (err) {
          this.logger.warn(`Retry failed for post ${post.id}`);
        }
      }
    }
 
    async updateScheduledPost(id: string, dto: UpdateScheduledPostDto): Promise<ScheduledPost> {
      const post = await this.postRepo.findOneBy({ id: id as any });
      if (!post) throw new NotFoundException('POST_NOT_FOUND');
 
      Object.assign(post, dto);
      return await this.postRepo.save(post);
    }
 
    async cancelScheduledPost(id: string) {
      const post = await this.postRepo.findOneBy({ id: id as any });
      if (!post) throw new NotFoundException('POST_NOT_FOUND');
 
      post.status = 'canceled' as any;
      await this.postRepo.save(post);
      return { id, canceled: true };
    }
 
    async getPendingPosts(): Promise<ScheduledPost[]> {
      return await this.postRepo.find({
        where: { status: 'pending' },
        relations: ['account', 'account.user'],
      });
    }
  }
 
