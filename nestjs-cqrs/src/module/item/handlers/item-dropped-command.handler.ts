import { DataSource } from 'typeorm';

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { ItemQuery } from 'src/query';

import { ItemDroppedCommand } from '../commands';
import { ItemDroppedEvent } from '../events';

@CommandHandler(ItemDroppedCommand)
export class ItemDroppedCommandHandler
  implements ICommandHandler<ItemDroppedCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: ItemDroppedCommand) {
    console.log({ name: ItemDroppedCommandHandler.name, command });

    const itemQuery = new ItemQuery(this.dataSource);
    const item = await itemQuery.findOneByRand();

    await itemQuery.upsert(item.dropped());
    const itemModel = this.publisher.mergeObjectContext(item);

    itemModel.apply(new ItemDroppedEvent(command.heroId, item.id));
    itemModel.commit();
  }
}
