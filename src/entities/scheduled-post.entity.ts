import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SocialAccount } from "./social-account.entity";

@Entity()
export class ScheduledPost {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  caption: string;


  @Column('simple-array')
  mediaUrls: string[];


  @Column()
  scheduleTime: Date;


  @Column({ default: 'pending' })
  status: 'pending' | 'posted' | 'failed';


  @ManyToOne(() => SocialAccount, acc => acc.scheduledPosts)
  account: SocialAccount;
}
