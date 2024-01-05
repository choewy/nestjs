import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DropAncientItemCommand } from '../commands';
import { ItemRepository } from '../item.repository';

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemCommandHandler
  implements ICommandHandler<DropAncientItemCommand>
{
  constructor(
    private readonly repository: ItemRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand) {
    const { heroId } = command;

    const item = this.publisher.mergeObjectContext(
      await this.repository.findOneByRandom(),
    );

    console.log({ name: DropAncientItemCommandHandler.name, command, item });

    item.dropped(heroId);
    item.commit();
  }
}
