import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';
import { Hero } from './hero.entity';
import { Item } from './item.entity';

@Entity()
export class Inventory extends AggregateRoot {
  @PrimaryColumn({ type: 'int', unsigned: true })
  readonly heroId: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  readonly itemId: number;

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

  constructor(heroId: number, itemId: number) {
    super();
    this.heroId = heroId;
    this.itemId = itemId;
    this.hero = new Hero(heroId);
    this.item = new Item(itemId);
  }

  getItem() {
    this.count += 1;

    return this;
  }

  putItem() {
    this.count -= 1;

    return this;
  }
}
