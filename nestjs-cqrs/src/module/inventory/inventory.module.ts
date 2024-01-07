import { Module } from '@nestjs/common';

import { InventorySagas } from './inventory.sagas';
import { InventoryAddItemCommandHandler } from './handlers';

@Module({
  providers: [InventorySagas, InventoryAddItemCommandHandler],
})
export class InventoryModule {}
