import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { HeroKillDragonDto } from './dto';
import {
  HeroGetInventoryCommand,
  HeroGetStatCommand,
  HeroKillDragonCommand,
} from './commands';

@Injectable()
export class HeroService {
  constructor(private commandBus: CommandBus) {}

  async getStat(heroId: number) {
    return this.commandBus.execute(new HeroGetStatCommand(heroId));
  }

  async getInventory(heroId: number) {
    return this.commandBus.execute(new HeroGetInventoryCommand(heroId));
  }

  async killDragon(heroId: number, dto: HeroKillDragonDto) {
    return this.commandBus.execute(
      new HeroKillDragonCommand(heroId, dto.dragonId),
    );
  }
}
