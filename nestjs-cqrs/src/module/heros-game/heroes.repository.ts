import { Injectable } from '@nestjs/common';

import { Hero } from 'src/models';

@Injectable()
export class HeroesRepository {
  async findOneById(id: number) {
    return new Hero(id);
  }
}
