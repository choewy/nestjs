import { BeforeApplicationShutdown, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSConsumer, ConfigToken } from '@/core';

import { UserSQSConsumerName, UserSQSConsumerSubject } from './enums';
import { SQSLogService } from '@/logging';

@Injectable()
export class UserSQSConsumer implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly logger = new Logger(UserSQSConsumer.name);
  private readonly keys = Object.values(UserSQSConsumerName);
  private readonly consumers: Partial<Record<UserSQSConsumerName, AwsSQSConsumer>> = {};

  constructor(
    private readonly configService: ConfigService,
    private readonly sqsLogService: SQSLogService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  onApplicationBootstrap(): void {
    const awsConfigFactory = this.configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.keys.forEach((key) => {
      this.consumers[key] = AwsSQSConsumer.of(
        UserSQSConsumer.name,
        awsConfigFactory,
        awsSQSConfigFactory[key],
        this.sqsLogService,
        this.eventEmitter,
      );
    });
  }

  beforeApplicationShutdown(): void {
    this.keys.forEach((key) => {
      this.consumers[key].close();
    });
  }

  @OnEvent(UserSQSConsumerSubject.WELCOME_FROM_SYSTEM)
  async onWelcomeFromSystem(messageId: string, data: any) {
    await this.sqsLogService.consumeOk(messageId, UserSQSConsumer.name);

    this.logger.log(JSON.stringify(data, null, 2));
  }
}
