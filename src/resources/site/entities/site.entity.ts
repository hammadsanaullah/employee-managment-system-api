import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Rate } from '../../rate/entities/rate.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity()
export class Site extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  companyName: string;

  @Column()
  site: string;

  @Column()
  emirates: string;

  @Column()
  shiftHours: number;

  @OneToOne(() => Rate, (rate) => rate.site)
  rate: Rate;

  @OneToMany(() => Attendance, (attendance) => attendance.site)
  attendance: Attendance[];
}
