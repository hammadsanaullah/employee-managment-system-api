import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EntityBase } from '../../../shared/common/base.entity';
import { Site } from '../../site/entities/site.entity';

@Entity()
export class Rate extends EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column({ type: 'float' })
  rate: number;

  @Column()
  siteId: number;

  @OneToMany(() => Site, (site) => site.rate)
  @JoinColumn({ name: 'siteId' })
  site: Site;
}
