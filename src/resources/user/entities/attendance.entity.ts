import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { UserLocation } from './user-location.entity';

@Entity()
export class Attendance extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;

  @Column()
  month: string;

  @Column()
  week: number;

  @Column()
  weekDay: string;

  @Column({ type: 'timestamp' })
  checkIn: Date;

  @Column({ type: 'timestamp', nullable: true })
  checkOut: Date;

  @Column()
  userLocationId: number;

  @ManyToOne(() => UserLocation)
  @JoinColumn({ name: "userLocationId" })
  userLocation: UserLocation;
}
