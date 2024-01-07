import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';

import { Inventory } from './inventory.entity';

@Entity()
export class Hero extends AggregateRoot {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  exp: number;

  @OneToMany(() => Inventory, (e) => e.hero, { cascade: true })
  @JoinTable()
  inventories: Inventory[];

  setExp(exp: number) {
    this.exp += exp;

    return this;
  }
}
