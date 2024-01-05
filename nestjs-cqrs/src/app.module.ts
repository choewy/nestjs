import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfig } from './common';
import { Hero, Inventory, Item } from './entities';

import { InitializeModule } from './module/initialize';
import { HeroesGameModule } from './module/heros-game';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      new DBConfig().getTypeOrmModuleOptions([Hero, Item, Inventory]),
    ),
    InitializeModule,
    HeroesGameModule,
  ],
})
export class AppModule {}
