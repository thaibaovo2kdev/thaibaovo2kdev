import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ISocialAccount } from '../interfaces/social-account.interface';

@Entity()
@Index(['userId', 'platform'])
export abstract class BaseSocialAccount implements ISocialAccount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  teamId?: number;

  @Column()
  username: string;

  @Column()
  followers: number;

  @Column()
  platform: string;
}