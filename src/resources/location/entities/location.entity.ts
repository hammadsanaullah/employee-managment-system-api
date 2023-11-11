import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { EntityBase } from '../../../shared/common/base.entity';
  import { UserLocation } from '../../user/entities/user-location.entity';
  
  @Entity()
  export class Location extends EntityBase {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    locationTitle: string;
  
    @Column()
    city: string;
  
    @Column()
    country: string;
    
    @OneToMany(() => UserLocation, (userLocation) => userLocation.location)
    locationUsers: UserLocation[];
  }
  