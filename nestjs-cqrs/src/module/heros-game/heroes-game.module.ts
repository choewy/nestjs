import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { HeroesGameController } from './heroes-game.controller';
import { HeroesGameService } from './heroes-game.service';
import { HeroesRepository } from './heroes.repository';
import { ItemRepository } from './item.repository';
import { InventoryRepository } from './inventory.repository';
import { HeroesGameSagas } from './sagas';
import {
  KillDragonCommandHandler,
  HeroKilledDragonEventHandler,
  DropAncientItemCommandHandler,
  HeroFoundItemEventHandler,
  GetInventoryCommandHandler,
} from './handlers';

export const CommandHandlers = [
  KillDragonCommandHandler,
  DropAncientItemCommandHandler,
  GetInventoryCommandHandler,
];

export const EventHandlers = [
  HeroKilledDragonEventHandler,
  HeroFoundItemEventHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [HeroesGameController],
  providers: [
    HeroesGameService,
    HeroesGameSagas,
    HeroesRepository,
    ItemRepository,
    InventoryRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class HeroesGameModule {}
