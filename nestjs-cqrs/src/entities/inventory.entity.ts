import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';
import { Hero } from './hero.entity';
import { Item } from './item.entity';

@Entity()
export class Inventory extends AggregateRoot {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  count = 0;

  @ManyToOne(() => Hero, (e) => e.inventories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  hero: Hero;

  @ManyToOne(() => Item, (e) => e.inventories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  item: Item;

  getItem() {
    this.count += 1;

    return this;
  }

  useItem() {
    this.count -= 1;

    return this;
  }
}
