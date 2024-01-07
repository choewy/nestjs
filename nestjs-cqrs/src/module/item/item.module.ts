import { Module } from '@nestjs/common';

import { ItemSagas } from './item.sagas';
import { ItemDroppedCommandHandler } from './handlers';

@Module({
  providers: [ItemSagas, ItemDroppedCommandHandler],
})
export class ItemModule {}
