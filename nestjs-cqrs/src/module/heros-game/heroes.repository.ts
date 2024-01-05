import { Injectable } from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';

import { Hero } from 'src/entities';

@Injectable()
export class HeroesRepository {
  private readonly repository: Repository<Hero>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Hero);
  }

  async createOne() {
    const hero = this.repository.create();
    await this.repository.insert(hero);

    return hero;
  }

  async findOneById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
