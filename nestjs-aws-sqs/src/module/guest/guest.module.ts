import { Module } from '@nestjs/common';

import { AwsSQSModuleRef } from '@core/aws-sqs';

import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { GuestEventListener } from './guest.event-listener';
import { GuestEventHandler } from './guest.event-handler';

@Module({
  imports: [AwsSQSModuleRef],
  controllers: [GuestController],
  providers: [GuestService, GuestEventListener, GuestEventHandler],
})
export class GuestModule {}
