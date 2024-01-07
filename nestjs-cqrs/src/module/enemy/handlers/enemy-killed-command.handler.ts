import { DataSource } from 'typeorm';

import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EnemyQuery, HeroQuery } from 'src/query';

import { EnemyKilledCommand } from '../commands';

@CommandHandler(EnemyKilledCommand)
export class EnemyKilledCommandHandler
  implements ICommandHandler<EnemyKilledCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: EnemyKilledCommand) {
    console.log({ name: EnemyKilledCommandHandler.name, command });

    const enemyQuery = new EnemyQuery(this.dataSource);
    const enemy = await enemyQuery.findOneById(command.enemyId);

    if (enemy == null) {
      throw new HttpException('not found enemy', 404);
    }

    await enemyQuery.upsert(enemy.killed());

    const heroQuery = new HeroQuery(this.dataSource);
    await heroQuery.upsert(command.hero.setExp(enemy.exp));
  }
}
