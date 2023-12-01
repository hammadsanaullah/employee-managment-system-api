import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column({ default: 'ADMIN' })
  role: string;
}
