import { Module } from '@nestjs/common';

import { RedisModuleRef } from '@core/redis';

import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  imports: [RedisModuleRef],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
