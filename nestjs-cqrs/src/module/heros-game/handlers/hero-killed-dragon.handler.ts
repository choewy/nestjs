import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroKilledDragonEvent } from 'src/module/heros-game/events';

import { HeroesRepository } from '../heroes.repository';

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonEventHandler
  implements IEventHandler<HeroKilledDragonEvent>
{
  constructor(private repository: HeroesRepository) {}

  handle(event: HeroKilledDragonEvent) {
    console.log(
      JSON.stringify(
        { name: HeroKilledDragonEventHandler.name, event },
        null,
        2,
      ),
    );
  }
}
