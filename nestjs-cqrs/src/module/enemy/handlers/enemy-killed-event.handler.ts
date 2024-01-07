import { DataSource } from 'typeorm';

import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { EnemyQuery } from 'src/query';

import { EnemyKilledEvent } from '../events';

@EventsHandler(EnemyKilledEvent)
export class EnemyKilledEventHandler
  implements IEventHandler<EnemyKilledEvent>
{
  constructor(private readonly dataSource: DataSource) {}

  async handle(event: EnemyKilledEvent) {
    console.log({ name: EnemyKilledEventHandler.name, event });

    const enemyQuery = new EnemyQuery(this.dataSource);
    await enemyQuery.upsert(event.enemy.killed());
  }
}
