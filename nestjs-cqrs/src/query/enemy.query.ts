import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

import { Enemy } from 'src/entities';

export class EnemyQuery {
  private readonly repository: Repository<Enemy>;

  constructor(private readonly source: DataSource | EntityManager) {
    this.repository = this.source.getRepository(Enemy);
  }

  async findOneById(id: number): Promise<Enemy> {
    return this.repository.findOne({ where: { id } });
  }

  async upsert(enemy: Enemy): Promise<InsertResult> {
    return this.repository.upsert(enemy, { conflictPaths: { id: true } });
  }
}
