import { DataSource } from 'typeorm';

import { HttpException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { EnemyQuery, HeroQuery, ItemQuery } from 'src/query';

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

    const enemyQuery = new EnemyQuery(this.dataSource);
    const enemy = await enemyQuery.findOneById(command.dragonId);

    if (enemy == null) {
      throw new HttpException('not found dragon', 404);
    }

    const heroQuery = new HeroQuery(this.dataSource);
    const hero = await heroQuery.findOneById(command.heroId);

    if (hero == null) {
      throw new HttpException('not found hero', 404);
    }

    const heroModel = this.publisher.mergeObjectContext(hero);

    const itemQuery = new ItemQuery(this.dataSource);
    const item = await itemQuery.findOneByRand();

    heroModel.apply(new HeroKillDragonEvent(hero, enemy, item));
    heroModel.commit();
  }
}
