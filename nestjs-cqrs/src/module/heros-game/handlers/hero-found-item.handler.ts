import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroFoundItemEvent } from '../events';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemEventHandler
  implements IEventHandler<HeroFoundItemEvent>
{
  handle(event: HeroFoundItemEvent) {
    console.log(
      JSON.stringify({
        name: HeroFoundItemEventHandler.name,
        event,
      }),
    );
  }
}
