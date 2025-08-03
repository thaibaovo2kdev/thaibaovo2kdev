import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ScheduledPost } from "./scheduled-post.entity";


@Entity()
export class AnalyticsData {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  postId: number;


  @Column()
  views: number;


  @Column()
  likes: number;


  @Column()
  comments: number;


  @ManyToOne(() => ScheduledPost)
  @JoinColumn({ name: 'postId' })
  post: ScheduledPost;
}
