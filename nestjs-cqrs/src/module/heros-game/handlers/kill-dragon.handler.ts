import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { KillDragonCommand } from 'src/module/heros-game/commands';

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

    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(heroId),
    );

    console.log({ name: KillDragonCommandHandler.name, command, hero });

    hero.killEnemy(dragonId);
    hero.commit();
  }
}
