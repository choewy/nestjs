import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { SystemSQSProducerName } from './enums';
import { SQSLogService } from '@/logging';

@Injectable()
export class SystemSQSProducer implements OnApplicationBootstrap {
  private readonly keys = Object.values(SystemSQSProducerName);
  private readonly producers: Partial<Record<SystemSQSProducerName, AwsSQSProducer>> = {};

  constructor(private readonly configService: ConfigService, private readonly sqsLogService: SQSLogService) {}

  onApplicationBootstrap(): void {
    const awsConfigFactory = this.configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.keys.forEach((key) => {
      this.producers[key] = AwsSQSProducer.of(
        SystemSQSProducer.name,
        awsConfigFactory,
        awsSQSConfigFactory[key],
        this.sqsLogService,
      );
    });
  }

  async sendToUser(subject: string, data: object): Promise<void> {
    await this.producers.userQueue.send(subject, data);
  }
}
