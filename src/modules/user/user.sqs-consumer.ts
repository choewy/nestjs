import { BeforeApplicationShutdown, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSConsumer, ConfigToken } from '@/core';

import { UserSQSConsumerSubject } from './enums';

@Injectable()
export class UserSQSConsumer implements BeforeApplicationShutdown {
  private readonly consumer: AwsSQSConsumer;
  private readonly logger = new Logger(UserSQSConsumer.name);

  constructor(private readonly configService: ConfigService, private readonly eventEmitter: EventEmitter2) {
    const { endPoint, userQueueName } = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.consumer = AwsSQSConsumer.of(
      configService.get<AwsConfigFactory>(ConfigToken.AWS),
      endPoint,
      userQueueName,
      this.eventEmitter,
    );
  }

  beforeApplicationShutdown(): void {
    this.consumer.close();
  }

  @OnEvent(UserSQSConsumerSubject.WELCOME)
  async onWelcomeFromSystem(data: any) {
    this.logger.log(JSON.stringify(data, null, 2));
  }
}
