import { DataSource, EntityManager, In, Repository } from 'typeorm';

import { Item } from 'src/entities';

export class ItemQuery {
  private readonly repository: Repository<Item>;

  constructor(private readonly source: DataSource | EntityManager) {
    this.repository = this.source.getRepository(Item);
  }

  async findOneByRand(): Promise<Item> {
    return this.repository
      .createQueryBuilder('item')
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  }

  async findManyInId(ids: number[]): Promise<Item[]> {
    return this.repository.find({
      where: { id: In([0].concat(ids)) },
    });
  }
}
