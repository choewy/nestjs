import { Body, Controller, Param, Post } from '@nestjs/common';

import { HeroesGameService } from './heroes-game.service';
import { KillDragonDto } from './dto';

@Controller('heroes-game')
export class HeroesGameController {
  constructor(private readonly service: HeroesGameService) {}

  @Post(':heroId(\\d+)')
  async killDragon(
    @Param('heroId') heroId: number,
    @Body() body: KillDragonDto,
  ) {
    await this.service.killDragon(heroId, body);
  }
}
