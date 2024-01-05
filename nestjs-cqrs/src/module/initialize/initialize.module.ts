import { DataSource } from 'typeorm';

import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { Hero, Item } from 'src/entities';

@Module({})
export class InitializeModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap(): Promise<void> {
    const itemRepository = this.dataSource.getRepository(Item);
    await itemRepository.upsert(
      itemRepository.create(
        [
          'red portion',
          'blue portion',
          'green portion',
          'yellow portion',
          'dragon tail',
          'dragon teeth',
          'dragon claws',
          'dragon scales',
        ].map((name, index) => ({ id: index + 1, name })),
      ),
      { conflictPaths: { id: true } },
    );

    const heroRepository = this.dataSource.getRepository(Hero);
    await heroRepository.upsert(
      heroRepository.create(
        new Array(5).fill('hero').map((name, index) => ({
          id: index + 1,
          name: [name, index + 1].join('_'),
        })),
      ),
      { conflictPaths: { id: true } },
    );
  }
}
