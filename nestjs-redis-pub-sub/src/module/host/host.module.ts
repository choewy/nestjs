import { Module } from '@nestjs/common';

import { RedisModuleRef } from '@core/redis';

import { HostService } from './host.service';
import { HostEventListener } from './host.event-listener';

@Module({
  imports: [RedisModuleRef],
  providers: [HostService, HostEventListener],
})
export class HostModule {}
