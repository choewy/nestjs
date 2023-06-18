import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { UserSQSProducerName } from './enums';

@Injectable()
export class UserSQSProducer implements OnApplicationBootstrap {
  private readonly keys = Object.values(UserSQSProducerName);
  private readonly producers: Partial<Record<UserSQSProducerName, AwsSQSProducer>> = {};

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap(): void {
    const awsConfigFactory = this.configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.keys.forEach((key) => {
      this.producers[key] = AwsSQSProducer.of(awsConfigFactory, awsSQSConfigFactory[key]);
    });
  }

  public get systemQueue(): AwsSQSProducer {
    return this.producers.systemQueue;
  }
}
