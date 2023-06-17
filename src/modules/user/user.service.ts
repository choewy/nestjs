import {
  AwsConfigFactory,
  AwsSQSConsumer,
  AwsSQSConfigFactory,
  ConfigToken,
  AwsSQSProducer,
  AwsSQSMessageBody,
} from '@/core';
import { BeforeApplicationShutdown, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService implements BeforeApplicationShutdown {
  private readonly userSQSConsumer: AwsSQSConsumer;
  private readonly systemSQSProducer: AwsSQSProducer;

  constructor(private readonly configService: ConfigService, private readonly eventEmitter: EventEmitter2) {
    const awsConfigFactory = configService.get<AwsConfigFactory>(ConfigToken.AWS);
    const awsSQSConfigFactory = this.configService.get<AwsSQSConfigFactory>(ConfigToken.AWS_SQS);

    this.userSQSConsumer = AwsSQSConsumer.of(
      awsConfigFactory,
      awsSQSConfigFactory.endPoint,
      awsSQSConfigFactory.userQueueName,
      this.eventEmitter,
    );

    this.systemSQSProducer = AwsSQSProducer.of(
      awsConfigFactory,
      awsSQSConfigFactory.endPoint,
      awsSQSConfigFactory.systemQueueName,
    );
  }

  beforeApplicationShutdown(): void {
    this.userSQSConsumer.close();
  }

  async sendToSystem(subject: string, data: object) {
    return this.systemSQSProducer.sendMessage(AwsSQSMessageBody.to(subject, data));
  }
}
