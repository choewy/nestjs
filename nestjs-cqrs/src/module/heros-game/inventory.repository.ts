import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Inventory } from 'src/entities';

@Injectable()
export class InventoryRepository {
  private readonly repository: Repository<Inventory>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Inventory);
  }

  async findByHero(heroId: number) {
    return this.repository.find({
      where: { heroId },
    });
  }

  async findOneByHeroItem(heroId: number, itemId: number) {
    return this.repository.findOne({
      relations: { hero: true, item: true },
      select: {
        heroId: true,
        itemId: true,
        count: true,
        hero: { id: true },
        item: { id: true },
      },
      where: { heroId, itemId },
    });
  }

  async updateOne(inventory: Inventory) {
    return this.repository.upsert(inventory, {
      conflictPaths: { heroId: true, itemId: true },
    });
  }
}
