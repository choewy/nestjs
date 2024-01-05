import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DBConfig } from './common';

import { HeroesGameModule } from './module/heros-game';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(new DBConfig().getTypeOrmModuleOptions([])),
    HeroesGameModule,
  ],
})
export class AppModule {}
