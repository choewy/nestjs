import { DataSource } from 'typeorm';

import { HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { HeroQuery } from 'src/query';

import { HeroGetStatCommand } from '../commands';
import { HeroStatDto } from '../dto';

@CommandHandler(HeroGetStatCommand)
export class HeroGetStatCommandHandler
  implements ICommandHandler<HeroGetStatCommand>
{
  constructor(private readonly dataSource: DataSource) {}

  async execute(command: HeroGetStatCommand): Promise<any> {
    console.log({ name: HeroGetStatCommandHandler.name, command });

    const heroQuery = new HeroQuery(this.dataSource);
    const hero = await heroQuery.findOneById(command.heroId);

    if (hero == null) {
      throw new HttpException('not found hero.', 404);
    }

    return new HeroStatDto(hero.id, hero.name, hero.exp);
  }
}
