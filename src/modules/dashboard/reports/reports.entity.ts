import { Entity, Column } from 'typeorm';
import { BaseAnalyticsEntity } from '../../../shared/base/base-analytics.entity';

@Entity()
export class Report extends BaseAnalyticsEntity {
  @Column('json')
  performance: { reach: number; impressions: number };
}