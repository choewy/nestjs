import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { AwsSQSModule } from './aws-sqs';

@Module({
  imports: [ConfigModule, AwsSQSModule],
  exports: [ConfigModule, AwsSQSModule],
})
export class CoreModule {}
