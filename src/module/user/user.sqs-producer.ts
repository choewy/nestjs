import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { UserSQSProducerName } from './enums';
import { SQSLogService } from '@/logging';

@Injectable()
export class UserSQSProducer implements OnApplicationBootstrap {
  private readonly keys = Object.values(UserSQSProducerName);
  private readonly producers: Partial<Record<UserSQSProducerName, AwsSQSProducer>> = {};

  constructor(private readonly configService: ConfigService, private readonly sqsLogService: SQSLogService) {}

  onApplicationBootstrap(): void {
    const awsConfigFactory = this.configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.keys.forEach((key) => {
      this.producers[key] = AwsSQSProducer.of(
        UserSQSProducer.name,
        awsConfigFactory,
        awsSQSConfigFactory[key],
        this.sqsLogService,
      );
    });
  }

  async sendToSystem(subject: string, data: object): Promise<void> {
    await this.producers.systemQueue.send(subject, data);
  }
}
