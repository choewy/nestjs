import { DataSource } from 'typeorm';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InventoryQuery } from 'src/query';

import { InventoryAddItemCommand } from '../commands';

@CommandHandler(InventoryAddItemCommand)
export class InventoryAddItemCommandHandler
  implements ICommandHandler<InventoryAddItemCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: InventoryAddItemCommand): Promise<void> {
    console.log({ name: InventoryAddItemCommandHandler.name, command });

    const inventoryQuery = new InventoryQuery(this.dataSource);
    const inventory = await inventoryQuery.findOneByHeroAndItem(
      command.heroId,
      command.itemId,
    );

    await inventoryQuery.upsertOne(inventory.getItem());
  }
}
