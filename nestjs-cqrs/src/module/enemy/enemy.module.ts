import { Module } from '@nestjs/common';

import { EnemyKilledEventHandler } from './handlers';

@Module({
  providers: [EnemyKilledEventHandler],
})
export class EnemyModule {}
