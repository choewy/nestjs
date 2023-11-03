import { Module } from '@nestjs/common';

import { AwsSQSModuleRef } from '@core/aws-sqs';

import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [AwsSQSModuleRef],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
