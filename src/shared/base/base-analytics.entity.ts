import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['accountId', 'platform'])
export abstract class BaseAnalyticsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  accountId: number;

  @Column()
  platform: string;

  @Column()
  createdAt: Date;
}