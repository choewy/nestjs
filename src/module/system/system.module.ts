import { Module } from '@nestjs/common';

import { SystemController } from './system.controller';
import { SystemSQSConsumer } from './system.sqs-consumer';
import { SystemSQSProducer } from './system.sqs-producer';
import { SQSLogModule } from '@/logging';

@Module({
  imports: [SQSLogModule],
  controllers: [SystemController],
  providers: [SystemSQSConsumer, SystemSQSProducer],
})
export class SystemModule {}
