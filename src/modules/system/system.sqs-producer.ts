import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { SystemSQSProducerName } from './enums';

@Injectable()
export class SystemSQSProducer {
  private readonly maps: Record<SystemSQSProducerName, AwsSQSProducer>;

  constructor(private readonly configService: ConfigService) {
    const { endPoint, userQueueName } = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.maps = {
      [SystemSQSProducerName.USER]: AwsSQSProducer.of(
        configService.get<AwsConfigFactory>(ConfigToken.AWS),
        endPoint,
        userQueueName,
      ),
    };
  }

  public get user(): AwsSQSProducer {
    return this.maps.user;
  }
}
