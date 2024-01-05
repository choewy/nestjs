import { AggregateRoot } from '@nestjs/cqrs';
import { HeroFoundItemEvent } from 'src/module/heros-game/events';

export class Item extends AggregateRoot {
  constructor(private id: number) {
    super();
  }

  dropped(heroId: number) {
    this.apply(new HeroFoundItemEvent(this.id, heroId));
  }
}
