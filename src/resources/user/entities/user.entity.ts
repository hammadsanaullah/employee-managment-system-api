import { IsDateFormat } from '../../../shared/common/is-date-format.decorator';
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

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  barCode: string;

  @Column()
  employeeCode: string;

  @Column({ nullable: true })
  noOfLeaves: number;

  @Column({ nullable: true })
  role: string;

  @Column({ default: false, nullable: true })
  checkedIn: boolean;

  @Column({ nullable: true })
  imageUrl: string;

  @VersionColumn()
  update: number;

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendance: Attendance[];

  @Column({ nullable: true })
  emirateId: string;

  @Column({ nullable: true })
  @IsDateFormat()
  dateJoining: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  dateBirth: Date;

  @Column({ nullable: true })
  passportNumber: string;

  @Column({ nullable: true })
  @IsDateFormat()
  passportIssue: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  passportExpiry: Date;

  @Column({ nullable: true })
  newPassportNumber: string;

  @Column({ nullable: true })
  @IsDateFormat()
  newPassportIssue: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  newPassportExpiry: Date;

  @Column({ nullable: true })
  visaNumber: string;

  @Column({ nullable: true })
  @IsDateFormat()
  visaIssue: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  visaExpiry: Date;

  @Column({ nullable: true })
  visaStatus: string;

  @Column({ nullable: true })
  visaValidity: string;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  workPermit: string;

  @Column({ nullable: true })
  workPermitPersonal: string;

  @Column({ nullable: true })
  @IsDateFormat()
  workPermitIssue: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  workPermitExpiry: Date;

  @Column({ nullable: true })
  newWorkPermit: string;

  @Column({ nullable: true })
  @IsDateFormat()
  newWorkPermitIssue: Date;

  @Column({ nullable: true })
  @IsDateFormat()
  newWorkPermitExpiry: Date;

  @Column()
  company: string;

  @Column({ nullable: true })
  companyTitle: string;

  // @OneToOne(() => Media, (media) => media.user)
  // media: Media;
}
