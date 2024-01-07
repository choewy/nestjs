import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AggregateRoot } from '@nestjs/cqrs';

import { EnemyType } from 'src/common';

@Entity()
export class Enemy extends AggregateRoot {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 20 })
  readonly type: EnemyType;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'smallint', unsigned: true })
  exp: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  killedCount: number;

  killed() {
    this.killedCount += 1;

    return this;
  }
}
