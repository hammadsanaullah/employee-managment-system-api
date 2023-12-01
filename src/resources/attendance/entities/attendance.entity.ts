import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Site } from '../../site/entities/site.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Attendance extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  shiftTime: string;

  @Column()
  siteId: number;

  @ManyToOne(() => Site, (site) => site.attendance)
  @JoinColumn({ name: 'siteId' })
  site: Site;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.attendance)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  totalHours: number;

  @Column({ default: false })
  shiftEnd: boolean;
}
