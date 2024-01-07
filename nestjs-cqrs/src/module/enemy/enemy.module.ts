import { Module } from '@nestjs/common';

import { EnemySagas } from './enemy.sagas';
import { EnemyKilledEventHandler } from './handlers';

@Module({
  providers: [EnemySagas, EnemyKilledEventHandler],
})
export class EnemyModule {}
