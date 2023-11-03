import { Module } from '@nestjs/common';

import { RedisModuleRef } from '@core/redis';

import { GuestService } from './guest.service';
import { GuestEventListener } from './guest.event-listener';

@Module({
  imports: [RedisModuleRef],
  providers: [GuestService, GuestEventListener],
})
export class GuestModule {}
