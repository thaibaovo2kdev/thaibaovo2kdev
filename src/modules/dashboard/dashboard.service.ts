import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(ScheduledPost)
    private readonly postRepo: Repository<ScheduledPost>
  ) {}

  async getOverview(userId: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId as any },
      relations: ['socialAccounts'],
    });

    if (!user) return { message: 'User not found' };

    const platforms = user.accounts.map((acc: any) => acc.platform);
    const totalFollowers = user.accounts.reduce((sum: any, acc: any) => sum + acc.followers, 0);

    const totalPosts = await this.postRepo.count({
      where: {
        account: {
          user: {
            id: userId as any,
          },
        },
      },
    });

    const avgEngagement = await this.postRepo
      .createQueryBuilder('post')
      .leftJoin('post.account', 'account')
      .leftJoin('account.user', 'user')
      .select('AVG(post.engagement)', 'avg')
      .where('user.id = :userId', { userId })
      .getRawOne();

    return {
      userId,
      platforms,
      totalFollowers,
      totalPosts,
      engagementRate: parseFloat(avgEngagement.avg) || 0,
    };
  }
}
