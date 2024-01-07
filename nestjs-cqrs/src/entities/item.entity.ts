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
export class Item extends AggregateRoot {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Inventory, (e) => e.item, { cascade: true })
  @JoinTable()
  inventories: Inventory[];
}
