import { DataSource } from 'typeorm';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { InventoryQuery, ItemQuery } from 'src/query';

import { HeroGetInventoryCommand } from '../commands';
import { HeroInventoryDto } from '../dto';

@CommandHandler(HeroGetInventoryCommand)
export class HeroGetInventoryCommandHandler
  implements ICommandHandler<HeroGetInventoryCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: HeroGetInventoryCommand): Promise<any> {
    console.log({ name: HeroGetInventoryCommandHandler.name, command });

    const inventoryQuery = new InventoryQuery(this.dataSource);
    const inventories = await inventoryQuery.findManyByHero(command.heroId);

    const itemQuery = new ItemQuery(this.dataSource);
    const items = await itemQuery.findManyInId(
      inventories.map(({ item }) => item.id),
    );

    const res: HeroInventoryDto[] = [];

    for (const item of items) {
      res.push(
        new HeroInventoryDto(
          item.id,
          item.name,
          inventories.find((inventory) => item.id === inventory.item.id)
            ?.count ?? 0,
        ),
      );
    }

    return res;
  }
}
