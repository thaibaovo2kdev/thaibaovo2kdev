import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { ScheduledPost } from "./scheduled-post.entity";


@Entity()
export class SocialAccount {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube';


  @Column()
  username: string;


  @ManyToOne(() => User, (user) => user.accounts)
  user: User;


  @OneToMany(() => ScheduledPost, (post) => post.account)
  scheduledPosts: ScheduledPost[];
}
