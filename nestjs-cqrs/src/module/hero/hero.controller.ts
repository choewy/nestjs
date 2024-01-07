import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { HeroService } from './hero.service';
import { HeroKillDragonDto } from './dto';

@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get(':heroId(\\d+)/stat')
  async getStat(@Param('heroId') heroId: number) {
    return this.heroService.getStat(+heroId);
  }

  @Get(':heroId(\\d+)/inventory')
  async getInventory(@Param('heroId') heroId: number) {
    return this.heroService.getInventory(+heroId);
  }

  @Post(':heroId(\\d+)')
  async killDragon(
    @Param('heroId') heroId: number,
    @Body() body: HeroKillDragonDto,
  ) {
    await this.heroService.killDragon(+heroId, body);
  }
}
