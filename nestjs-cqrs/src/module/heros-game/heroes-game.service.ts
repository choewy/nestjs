import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { KillDragonCommand } from 'src/module/heros-game/commands';

import { KillDragonDto } from './dto';

@Injectable()
export class HeroesGameService {
  constructor(private commandBus: CommandBus) {}

  async killDragon(heroId: number, killDragonDto: KillDragonDto) {
    return this.commandBus.execute(
      new KillDragonCommand(heroId, killDragonDto.dragonId),
    );
  }
}
