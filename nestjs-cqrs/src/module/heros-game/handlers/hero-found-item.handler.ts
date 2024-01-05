import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { HeroFoundItemEvent } from '../events';
import { InventoryRepository } from '../inventory.repository';
import { Inventory } from 'src/entities';

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemEventHandler
  implements IEventHandler<HeroFoundItemEvent>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: InventoryRepository,
  ) {}

  async handle(event: HeroFoundItemEvent) {
    const inventory = this.publisher.mergeObjectContext(
      (await this.repository.findOneByHeroItem(event.heroId, event.itemId)) ??
        new Inventory(event.heroId, event.itemId),
    );

    console.log({ name: HeroFoundItemEventHandler.name, event, inventory });

    await this.repository.updateOne(inventory.getItem());
  }
}
