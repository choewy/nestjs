import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserSQSConsumer } from './user.sqs-consumer';
import { UserSQSProducer } from './user.sqs-producer';
import { SQSLogModule } from '@/logging';

@Module({
  imports: [SQSLogModule],
  controllers: [UserController],
  providers: [UserSQSConsumer, UserSQSProducer],
})
export class UserModule {}
