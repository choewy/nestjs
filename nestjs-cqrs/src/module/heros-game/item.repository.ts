import { Injectable } from '@nestjs/common';

import { Item } from 'src/models';

@Injectable()
export class ItemRepository {
  async findOneByRandom() {
    return new Item(9);
  }
}
