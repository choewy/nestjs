import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { SystemSQSProducerName } from './enums';

@Injectable()
export class SystemSQSProducer implements OnApplicationBootstrap {
  private readonly keys = Object.values(SystemSQSProducerName);
  private readonly producers: Partial<Record<SystemSQSProducerName, AwsSQSProducer>> = {};

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap(): void {
    const awsConfigFactory = this.configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.keys.forEach((key) => {
      this.producers[key] = AwsSQSProducer.of(awsConfigFactory, awsSQSConfigFactory[key]);
    });
  }

  public get userQueue(): AwsSQSProducer {
    return this.producers.userQueue;
  }
}
