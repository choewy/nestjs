import { DataSource } from 'typeorm';

import { HttpException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { HeroQuery } from 'src/query';

import { HeroKillDragonCommand } from '../commands';
import { HeroKillDragonEvent } from '../events';

@CommandHandler(HeroKillDragonCommand)
export class HeroKillDragonCommandHandler
  implements ICommandHandler<HeroKillDragonCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: HeroKillDragonCommand) {
    console.log({ name: HeroKillDragonCommandHandler.name, command });

    const heroQuery = new HeroQuery(this.dataSource);
    const hero = await heroQuery.findOneById(command.heroId);

    if (hero == null) {
      throw new HttpException('not found hero', 404);
    }

    const heroModel = this.publisher.mergeObjectContext(hero);

    heroModel.apply(new HeroKillDragonEvent(hero, command.dragonId));
    heroModel.commit();
  }
}
