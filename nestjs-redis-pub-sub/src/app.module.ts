import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { RedisModule } from '@core/redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CheckoutModule } from '@module/checkout';
import { HostModule } from '@module/host';
import { GuestModule } from '@module/guest';

@Module({
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), RedisModule, CheckoutModule, HostModule, GuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
