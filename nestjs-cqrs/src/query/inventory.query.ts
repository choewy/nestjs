import { DataSource, EntityManager, InsertResult, Repository } from 'typeorm';

import { Inventory } from 'src/entities';

export class InventoryQuery {
  private readonly repository: Repository<Inventory>;

  constructor(private readonly source: DataSource | EntityManager) {
    this.repository = this.source.getRepository(Inventory);
  }

  async findManyByHero(heroId: number) {
    return this.repository.find({
      relations: { item: true },
      select: { hero: { id: true }, item: { id: true }, count: true },
      where: { hero: { id: heroId } },
    });
  }

  async findOneById(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  async findOneByHeroAndItem(
    heroId: number,
    itemId: number,
  ): Promise<Inventory | null> {
    const inventory = await this.repository.findOne({
      where: { hero: { id: heroId }, item: { id: itemId } },
    });

    return (
      inventory ??
      this.repository.create({
        hero: { id: heroId },
        item: { id: itemId },
        count: 0,
      })
    );
  }

  async upsertOne(inventory: Inventory): Promise<InsertResult> {
    return this.repository.upsert(inventory, { conflictPaths: { id: true } });
  }
}
