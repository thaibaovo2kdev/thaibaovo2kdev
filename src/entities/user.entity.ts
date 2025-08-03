import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SocialAccount } from "./social-account.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true })
  email: string;


  @OneToMany(() => SocialAccount, (acc) => acc.user)
  accounts: SocialAccount[];
}
