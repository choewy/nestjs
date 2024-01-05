import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { KillDragonDto } from './dto';
import { GetInventoryCommand, KillDragonCommand } from './commands';

@Injectable()
export class HeroesGameService {
  constructor(private commandBus: CommandBus) {}

  async getInventory(heroId: number) {
    return this.commandBus.execute(new GetInventoryCommand(heroId));
  }

  async killDragon(heroId: number, dto: KillDragonDto) {
    return this.commandBus.execute(new KillDragonCommand(heroId, dto.dragonId));
  }
}
