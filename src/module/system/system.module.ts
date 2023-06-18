import { Module } from '@nestjs/common';

import { SystemController } from './system.controller';
import { SystemSQSConsumer } from './system.sqs-consumer';
import { SystemSQSProducer } from './system.sqs-producer';

@Module({
  controllers: [SystemController],
  providers: [SystemSQSConsumer, SystemSQSProducer],
})
export class SystemModule {}
