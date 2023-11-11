import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { User } from '../../user/entities/user.entity';
// import { Admin } from '../../admin/entities/admin.entity';

@Entity()
export class Media extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @OneToOne(() => User, (user) => user.media)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  adminId: number;

  // @OneToOne(() => Admin, (admin) => admin.media)
  // @JoinColumn({ name: 'adminId' })
  // admin: Admin;

  @Column()
  imageUrl: string;
}
