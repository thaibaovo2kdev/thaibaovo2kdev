import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(ScheduledPost)
    private readonly postRepo: Repository<ScheduledPost>
  ) {}

  async getPostPerformance(accountId: string) {
    const posts = await this.postRepo.find({
      where: { account: { id: accountId as any }, status: 'posted' },
      take: 5,
      order: { id: 'DESC' },
    });

    const avgEngagement = await this.postRepo
      .createQueryBuilder('post')
      .leftJoin('post.account', 'account')
      .select('AVG(post.engagement)', 'avg')
      .where('account.id = :accountId', { accountId })
      .andWhere('post.status = :status', { status: 'posted' })
      .getRawOne();

    return {
      accountId,
      topPosts: posts.map(p => ({
        postId: p.id,
        caption: p.caption,
        engagement: 0,
      })),
      avgEngagementRate: parseFloat(avgEngagement?.avg) || 0,
    };
  }
}
