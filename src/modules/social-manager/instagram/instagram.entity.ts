import { Entity, Column } from 'typeorm';
import { BaseSocialAccount } from '../../../shared/base/base-social.entity';

@Entity()
export class InstagramAccount extends BaseSocialAccount {
  @Column()
  platform: string = 'instagram';
}