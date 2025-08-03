import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduledPost } from 'src/entities/scheduled-post.entity';
import { CreateScheduledPostDto } from './dto/create-scheduled-post.dto';
import { UpdateScheduledPostDto } from './dto/update-scheduled-post.dto';
import { SocialAccount } from 'src/entities/social-account.entity';


@Injectable()
export class InstagramSchedulerService {
  constructor(
    @InjectRepository(ScheduledPost)
    private readonly postRepo: Repository<ScheduledPost>,


    @InjectRepository(SocialAccount)
    private readonly accountRepo: Repository<SocialAccount>
  ) {}


  async schedulePost(dto: CreateScheduledPostDto) {
    const account = await this.accountRepo.findOneBy({ id: dto.accountId as any });
    if (!account) {
      throw new NotFoundException('NOT_FOUND');
    }


    const post = this.postRepo.create({
      ...dto,
      scheduleTime: new Date(dto.scheduleTime),
      status: 'pending',
      account,
    });


    return await this.postRepo.save(post);
  }


  async getAllScheduledPosts() {
    return await this.postRepo.find({
      relations: ['account'],
      order: { scheduleTime: 'ASC' },
    });
  }


  async updateScheduledPost(id: string, dto: UpdateScheduledPostDto) {
    const post = await this.postRepo.findOneBy({ id: id as any });
    if (!post) throw new NotFoundException('NOT_FOUND');


    Object.assign(post, dto);
    return await this.postRepo.save(post);
  }


  async deleteScheduledPost(id: string) {
    const post = await this.postRepo.findOneBy({ id: id as any });
    if (!post) throw new NotFoundException('NOT_FOUND');


    await this.postRepo.remove(post);
    return { id, deleted: true };
  }
}
