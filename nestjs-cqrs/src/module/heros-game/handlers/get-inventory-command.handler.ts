import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { GetInventoryCommand } from '../commands';
import { InventoryRepository } from '../inventory.repository';
import { ItemRepository } from '../item.repository';
import { HeroInventoryDto } from '../dto';

@CommandHandler(GetInventoryCommand)
export class GetInventoryCommandHandler
  implements ICommandHandler<GetInventoryCommand>
{
  constructor(
    private readonly inventoryRepository: InventoryRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(command: GetInventoryCommand): Promise<any> {
    const inventories = await this.inventoryRepository.findByHero(
      command.heroId,
    );

    const items = await this.itemRepository.findIn(
      inventories.map(({ itemId }) => itemId),
    );

    const res: HeroInventoryDto[] = [];

    for (const item of items) {
      res.push(
        new HeroInventoryDto(
          item.id,
          item.name,
          inventories.find(({ itemId }) => item.id === itemId)?.count ?? 0,
        ),
      );
    }

    return res;
  }
}
