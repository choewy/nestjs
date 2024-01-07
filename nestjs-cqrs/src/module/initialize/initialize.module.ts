import { DataSource } from 'typeorm';

import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { Enemy, Hero, Item } from 'src/entities';
import { EnemyType } from 'src/common';

@Module({})
export class InitializeModule implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap(): Promise<void> {
    const enemyRepository = this.dataSource.getRepository(Enemy);
    await enemyRepository.upsert(
      enemyRepository.create([
        {
          id: 1,
          type: EnemyType.Dragon,
          name: 'Red Dragon',
          exp: 12,
        },
        {
          id: 2,
          type: EnemyType.Dragon,
          name: 'Green Dragon',
          exp: 18,
        },
        {
          id: 3,
          type: EnemyType.Dragon,
          name: 'Blue Dragon',
          exp: 20,
        },
        {
          id: 4,
          type: EnemyType.Dragon,
          name: 'Horntail',
          exp: 52,
        },
      ]),
      { conflictPaths: { id: true } },
    );

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
