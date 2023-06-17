import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { AwsSQSService } from './aws-sqs.service';

@Module({
  imports: [ConfigModule],
  providers: [AwsSQSService],
})
export class AwsSQSModule {}
