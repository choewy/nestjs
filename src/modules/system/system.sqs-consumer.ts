import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSConsumer, ConfigToken } from '@/core';

import { SystemSQSConsumerSubject } from './enums';

@Injectable()
export class SystemSQSConsumer implements BeforeApplicationShutdown {
  private readonly consumer: AwsSQSConsumer;
  private readonly logger = new Logger(SystemSQSConsumer.name);

  constructor(private readonly configService: ConfigService, private readonly eventEmitter: EventEmitter2) {
    const { endPoint, systemQueueName } = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.consumer = AwsSQSConsumer.of(
      configService.get<AwsConfigFactory>(ConfigToken.AWS),
      endPoint,
      systemQueueName,
      this.eventEmitter,
    );
  }

  beforeApplicationShutdown(): void {
    this.consumer.close();
  }

  @OnEvent(SystemSQSConsumerSubject.HELLO)
  async onHelloFromUser(data: any) {
    this.logger.log(JSON.stringify(data, null, 2));
  }
}
