import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Rate } from '../../rate/entities/rate.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity()
export class Site extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({ unique: true })
  site: string;

  @Column()
  emirates: string;

  @Column()
  shiftHours: number;

  @OneToMany(() => Attendance, (attendance) => attendance.site)
  attendance: Attendance[];
}
