import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
@Index(['userId', 'resource', 'action'], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  teamId: number;

  @Column({ enum: ['admin', 'manager', 'user'] })
  role: string;

  @Column()
  resource: string;

  @Column()
  action: string;
}