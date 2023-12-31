import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Site, (site) => site.rate)
  @JoinColumn({ name: 'siteId' })
  site: Site;
}
