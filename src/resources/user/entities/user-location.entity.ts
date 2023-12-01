// import {
//     Entity,
//     Column,
//     PrimaryGeneratedColumn,
//     VersionColumn,
//     OneToOne,
//     OneToMany,
//     ManyToOne,
//     JoinColumn,
//   } from 'typeorm';
//   import { EntityBase } from '../../../shared/common/base.entity';
//   import { Location } from '../../location/entities/location.entity';
//   import { Media } from '../../media/entities/media.entity';
// import { User } from './user.entity';
// // import { Attendance } from './attendance.entity';
  
//   @Entity()
//   export class UserLocation extends EntityBase {
//     @PrimaryGeneratedColumn()
//     id: number;
  
//     @Column()
//     userId: number;
  
//     @ManyToOne(() => User)
//     @JoinColumn({ name: "userId" })
//     user: User;

//     @Column()
//     locationId: number;

//     @Column({ type: "float" })
//     hourlyRate: number;
  
//     @ManyToOne(() => Location)
//     @JoinColumn({ name: "locationId" })
//     location: Location;

//     // @OneToMany(() => Attendance, (attendance) => attendance.userLocation)
//     // attendance: Attendance[];
//   }
  