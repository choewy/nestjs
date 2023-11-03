import { Module } from '@nestjs/common';

import { AwsSQSModuleRef } from '@core/aws-sqs';

import { HostController } from './host.controller';
import { HostService } from './host.service';
import { HostEventListener } from './host.event-listener';
import { HostEventHandler } from './host.event-handler';

@Module({
  imports: [AwsSQSModuleRef],
  controllers: [HostController],
  providers: [HostService, HostEventListener, HostEventHandler],
})
export class HostModule {}
