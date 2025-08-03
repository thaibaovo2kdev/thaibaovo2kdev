import { Entity, Column } from 'typeorm';
import { BaseAnalyticsEntity } from '../../../shared/base/base-analytics.entity';

@Entity()
export class Analytics extends BaseAnalyticsEntity {
  @Column('json')
  engagement: { likes: number; comments: number; shares: number };
}