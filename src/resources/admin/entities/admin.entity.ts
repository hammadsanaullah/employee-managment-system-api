import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from '../../../shared/entities/abstract.entity';
import { Role } from '../../../utils/constants';
import { EntityBase } from '../../../shared/common/base.entity';

@Entity()
export class Admin extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: 'ADMIN' })
  role: Role;
}
