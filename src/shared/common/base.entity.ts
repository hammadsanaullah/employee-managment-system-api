import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

abstract class EntityBase extends BaseEntity {
  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  public updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  public deletedAt: Date;
}

export { EntityBase };
