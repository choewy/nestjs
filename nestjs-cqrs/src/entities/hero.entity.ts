import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';

import { HeroKilledDragonEvent } from 'src/module/heros-game/events';
import { Inventory } from './inventory.entity';

@Entity()
export class Hero extends AggregateRoot {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToMany(() => Inventory, (e) => e.hero, { cascade: true })
  @JoinTable()
  inventories: Inventory[];

  constructor(id: number) {
    super();
    this.id = id;
  }

  killEnemy(enemyId: string) {
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  }
}
