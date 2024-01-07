import { Module } from '@nestjs/common';

import { ItemSagas } from './item.sagas';
import { DropItemCommandHandler } from './handlers';

@Module({
  providers: [ItemSagas, DropItemCommandHandler],
})
export class ItemModule {}
