import { Module } from '@nestjs/common';
import { ConfigModule, ConfigToken } from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return configService.get(ConfigToken.MYSQL);
      },
    }),
  ],
  exports: [ConfigModule],
})
export class CoreModule {}
