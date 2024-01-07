import { Module } from '@nestjs/common';

import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

import {
  HeroGetStatCommandHandler,
  HeroGetInventoryCommandHandler,
  HeroKillDragonCommandHandler,
  HeroKillDragonEventHandler,
} from './handlers';

export const CommandHandlers = [
  HeroGetStatCommandHandler,
  HeroGetInventoryCommandHandler,
  HeroKillDragonCommandHandler,
];

export const EventHandlers = [HeroKillDragonEventHandler];

@Module({
  controllers: [HeroController],
  providers: [HeroService, ...CommandHandlers, ...EventHandlers],
})
export class HeroModule {}
