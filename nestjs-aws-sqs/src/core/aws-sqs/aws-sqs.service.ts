import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsSQSQueueName } from '@common/enums';
import { AwsSQSConfig } from '@common/configs';

import { AwsSQSLogService } from './aws-sqs-log.service';
import { AwsSQSProducer } from './aws-sqs.producer';
import { AwsSQSConsumer } from './aws-sqs.consumer';

@Injectable()
export class AwsSQSService {
  private readonly config = new AwsSQSConfig();

  constructor(private readonly awsSQSLogService: AwsSQSLogService, private readonly eventEmitter: EventEmitter2) {}

  public createProducer(producerName: string): AwsSQSProducer {
    return new AwsSQSProducer(this.config, producerName, this.awsSQSLogService);
  }

  public createConsumer(queueName: AwsSQSQueueName, consumerName: string) {
    return new AwsSQSConsumer(this.config, queueName, consumerName, this.awsSQSLogService, this.eventEmitter);
  }
}
