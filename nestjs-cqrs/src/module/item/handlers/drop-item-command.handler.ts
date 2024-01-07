import { DataSource } from 'typeorm';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DropItemCommand } from '../commands';
import { InventoryQuery } from 'src/query';

@CommandHandler(DropItemCommand)
export class DropItemCommandHandler
  implements ICommandHandler<DropItemCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(event: DropItemCommand) {
    console.log({ name: DropItemCommandHandler.name, event });

    const inventoryQuery = new InventoryQuery(this.dataSource);
    const inventory = await inventoryQuery.findOneByHeroAndItem(
      event.hero.id,
      event.item.id,
    );

    await inventoryQuery.upsertOne(inventory.getItem());
  }
}
