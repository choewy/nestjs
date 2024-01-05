import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { HeroesGameService } from './heroes-game.service';
import { KillDragonDto } from './dto';

@Controller('heroes-game')
export class HeroesGameController {
  constructor(private readonly service: HeroesGameService) {}

  @Get(':heroId(\\d+)/inventory')
  async getInventory(@Param('heroId') heroId: number) {
    return this.service.getInventory(heroId);
  }

  @Post(':heroId(\\d+)')
  async killDragon(
    @Param('heroId') heroId: number,
    @Body() body: KillDragonDto,
  ) {
    await this.service.killDragon(heroId, body);
  }
}
