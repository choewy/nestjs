import { HttpException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { KillDragonCommand } from '../commands';

import { HeroesRepository } from '../heroes.repository';

@CommandHandler(KillDragonCommand)
export class KillDragonCommandHandler
  implements ICommandHandler<KillDragonCommand>
{
  constructor(
    private readonly repository: HeroesRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: KillDragonCommand) {
    const { heroId, dragonId } = command;

    const hero = await this.repository.findOneById(heroId);

    if (hero == null) {
      throw new HttpException('not found hero', 404);
    }

    const heroModel = this.publisher.mergeObjectContext(hero);

    heroModel.killEnemy(dragonId);
    heroModel.commit();
  }
}
