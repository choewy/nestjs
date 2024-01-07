import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

import { Hero } from 'src/entities';

export class HeroQuery {
  private readonly repository: Repository<Hero>;

  constructor(private readonly source: DataSource | EntityManager) {
    this.repository = this.source.getRepository(Hero);
  }

  async findOneById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async upsert(hero: Hero): Promise<InsertResult> {
    return this.repository.upsert(hero, { conflictPaths: { id: true } });
  }
}
