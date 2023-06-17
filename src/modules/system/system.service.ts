import {
  AwsConfigFactory,
  AwsSQSConfigFactory,
  AwsSQSConsumer,
  AwsSQSMessageBody,
  AwsSQSProducer,
  ConfigToken,
} from '@/core';
import { BeforeApplicationShutdown, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class SystemService implements BeforeApplicationShutdown {
  private readonly systemSQSConsumer: AwsSQSConsumer;
  private readonly userSQSProducer: AwsSQSProducer;

  constructor(private readonly configService: ConfigService, private readonly eventEmitter: EventEmitter2) {
    const awsConfigFactory = configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.systemSQSConsumer = AwsSQSConsumer.of(
      awsConfigFactory,
      awsSQSConfigFactory.endPoint,
      awsSQSConfigFactory.systemQueueName,
      this.eventEmitter,
    );

    this.userSQSProducer = AwsSQSProducer.of(
      awsConfigFactory,
      awsSQSConfigFactory.endPoint,
      awsSQSConfigFactory.userQueueName,
    );
  }

  beforeApplicationShutdown(): void {
    this.systemSQSConsumer.close();
  }

  async sendToUser(subject: string, data: object) {
    return this.userSQSProducer.sendMessage(AwsSQSMessageBody.to(subject, data));
  }
}
