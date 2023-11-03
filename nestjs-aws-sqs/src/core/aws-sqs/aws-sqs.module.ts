import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoDBConnectionName } from '@common/enums';
import { AwsSQSLog, AwsSQSLogSchema } from '@common/schemas';

import { AwsSQSLogService } from './aws-sqs-log.service';
import { AwsSQSService } from './aws-sqs.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AwsSQSLog.name, schema: AwsSQSLogSchema }], MongoDBConnectionName.Logger),
  ],
  providers: [AwsSQSLogService, AwsSQSService],
  exports: [AwsSQSService],
})
export class AwsSQSModule {}
export const AwsSQSModuleRef = forwardRef(() => AwsSQSModule);
