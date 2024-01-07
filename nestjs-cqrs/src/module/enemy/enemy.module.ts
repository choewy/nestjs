import { Module } from '@nestjs/common';

import { EnemySagas } from './enemy.sagas';
import { EnemyKilledCommandHandler } from './handlers';

@Module({
  providers: [EnemySagas, EnemyKilledCommandHandler],
})
export class EnemyModule {}
