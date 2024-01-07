import { DataSource } from 'typeorm';

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroQuery } from 'src/query';

import { HeroKillDragonEvent } from '../events';

@EventsHandler(HeroKillDragonEvent)
export class HeroKillDragonEventHandler
  implements IEventHandler<HeroKillDragonEvent>
{
  constructor(private readonly dataSource: DataSource) {}

  async handle(event: HeroKillDragonEvent) {
    console.log({ name: HeroKillDragonEventHandler.name, event });

    const heroQuery = new HeroQuery(this.dataSource);
    await heroQuery.upsert(event.hero.setExp(event.dragon.exp));
  }
}
