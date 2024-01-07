import { DataSource } from 'typeorm';

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EnemyQuery } from 'src/query';

import { EnemyKilledCommand } from '../commands';

@CommandHandler(EnemyKilledCommand)
export class EnemyKilledCommandHandler
  implements ICommandHandler<EnemyKilledCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(event: EnemyKilledCommand) {
    console.log({ name: EnemyKilledCommandHandler.name, event });

    const enemyQuery = new EnemyQuery(this.dataSource);
    await enemyQuery.upsert(event.enemy.killed());
  }
}
