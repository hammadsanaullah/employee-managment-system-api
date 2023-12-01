import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity()
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({
    unique: true,
  })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  barCode: string;

  @Column()
  employeeCode: string;

  @Column()
  noOfLeaves: number;

  @Column()
  role: string;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyTitle: string;

  @Column({ default: false, nullable: true })
  checkedIn: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @VersionColumn()
  update: number;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendance: Attendance[];

  // @OneToOne(() => Media, (media) => media.user)
  // media: Media;
}
