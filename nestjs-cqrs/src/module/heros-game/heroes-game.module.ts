import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { HeroesGameSagas } from 'src/module/heros-game/sagas';

import { HeroesGameController } from './heroes-game.controller';
import { HeroesGameService } from './heroes-game.service';
import { HeroesRepository } from './heroes.repository';
import {
  KillDragonCommandHandler,
  HeroKilledDragonEventHandler,
  DropAncientItemCommandHandler,
  HeroFoundItemEventHandler,
} from './handlers';
import { ItemRepository } from './item.repository';

export const CommandHandlers = [
  KillDragonCommandHandler,
  DropAncientItemCommandHandler,
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
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class HeroesGameModule {}
