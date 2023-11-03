import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsSQSConfig } from '@common/configs';

import { AwsSQSLogService } from './aws-sqs-log.service';
import { AwsSQSProducer } from './aws-sqs.producer';

@Injectable()
export class AwsSQSService {
  constructor(private readonly awsSQSLogService: AwsSQSLogService, private readonly eventEmitter: EventEmitter2) {}

  public createProducer(producerName: string): AwsSQSProducer {
    return new AwsSQSProducer(new AwsSQSConfig(), producerName, this.awsSQSLogService);
  }
}
