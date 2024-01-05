import { AggregateRoot } from '@nestjs/cqrs';

import { HeroKilledDragonEvent } from 'src/module/heros-game/events';

export class Hero extends AggregateRoot {
  constructor(private id: number) {
    super();
  }

  killEnemy(enemyId: string) {
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  }
}
