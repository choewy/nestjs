import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfig } from './common';
import { Enemy, Hero, Inventory, Item } from './entities';

import { InitializeModule } from './module/initialize';
import { EnemyModule } from './module/enemy';
import { HeroModule } from './module/hero';
import { ItemModule } from './module/item';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      new DBConfig().getTypeOrmModuleOptions([Enemy, Item, Hero, Inventory]),
    ),
    InitializeModule,
    EnemyModule,
    ItemModule,
    HeroModule,
  ],
})
export class AppModule {}
