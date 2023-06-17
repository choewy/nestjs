import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfigFactory, AwsSQSConfigFactory, AwsSQSProducer, ConfigToken } from '@/core';

import { UserSQSProducerName } from './enums';

@Injectable()
export class UserSQSProducer {
  private readonly maps: Record<UserSQSProducerName, AwsSQSProducer>;

  constructor(private readonly configService: ConfigService) {
    const { endPoint, systemQueueName } = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.maps = {
      [UserSQSProducerName.SYSTEM]: AwsSQSProducer.of(
        configService.get<AwsConfigFactory>(ConfigToken.AWS),
        endPoint,
        systemQueueName,
      ),
    };
  }

  public get system(): AwsSQSProducer {
    return this.maps.system;
  }
}
