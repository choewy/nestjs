import { Module } from '@nestjs/common';

import { HeroController } from './hero.controller';
import { HeroService } from './hero.service';

import {
  HeroGetStatCommandHandler,
  HeroGetInventoryCommandHandler,
  HeroKillDragonCommandHandler,
} from './handlers';

export const CommandHandlers = [
  HeroGetStatCommandHandler,
  HeroGetInventoryCommandHandler,
  HeroKillDragonCommandHandler,
];

@Module({
  controllers: [HeroController],
  providers: [
    HeroService,
    HeroGetStatCommandHandler,
    HeroGetInventoryCommandHandler,
    HeroKillDragonCommandHandler,
  ],
})
export class HeroModule {}
