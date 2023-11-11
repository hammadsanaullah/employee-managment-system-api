import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  VersionColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Media } from '../../media/entities/media.entity';
import { UserLocation } from './user-location.entity';

@Entity()
export class User extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column({nullable: true})
  lastName: string;

  @Column({
    unique: true
  })
  phoneNumber: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true})
  officialEmail: string;

  @Column()
  workAddress: string;

  @Column()
  workLocation: string;

  @Column()
  department: string;

  @Column()
  pinCode: string;

  @Column()
  barCode: string;

  @Column()
  role: string;

  @Column()
  employeeType: string;

  @Column({default: false})
  checkedIn: boolean;

  @VersionColumn()
  update: number;

  @OneToMany(() => UserLocation, (userLocation) => userLocation.user)
  userLocations: UserLocation[];

  @OneToOne(() => Media, (media) => media.user)
  media: Media;
}
