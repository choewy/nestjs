import { DataSource, In, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';

import { Item } from 'src/entities';

@Injectable()
export class ItemRepository {
  private readonly repository: Repository<Item>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Item);
  }

  async findIn(id: number[]) {
    return this.repository.find({
      where: { id: In([0].concat(id)) },
    });
  }

  async findOneByRandom() {
    return this.repository
      .createQueryBuilder('item')
      .orderBy('RAND()')
      .limit(1)
      .getOne();
  }
}
