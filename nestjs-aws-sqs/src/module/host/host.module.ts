import { Module } from '@nestjs/common';

import { AwsSQSModuleRef } from '@core/aws-sqs';

import { HostController } from './host.controller';
import { HostService } from './host.service';

@Module({
  imports: [AwsSQSModuleRef],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
