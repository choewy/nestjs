import { BadRequestException, BeforeApplicationShutdown, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AwsSQSQueueName } from '@common/enums';
import { HostMessageEvent } from '@common/events';

import { AwsSQSConsumer, AwsSQSProducer, AwsSQSService } from '@core/aws-sqs';

@Injectable()
export class GuestService implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly awsSQSProducer: AwsSQSProducer;
  private readonly awsSQSConsumer: AwsSQSConsumer;

  constructor(private readonly awsSQSService: AwsSQSService) {
    this.awsSQSProducer = this.awsSQSService.createProducer(GuestService.name);
    this.awsSQSConsumer = this.awsSQSService.createConsumer(AwsSQSQueueName.Guest, GuestService.name);
  }

  onApplicationBootstrap(): void {
    this.awsSQSConsumer.start();
  }

  beforeApplicationShutdown(): void {
    this.awsSQSConsumer.stop();
  }

  async sendMessageToHost(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    const error = await this.awsSQSProducer.sendMsg(
      AwsSQSQueueName.Host,
      HostMessageEvent.Subject,
      new HostMessageEvent(message),
    );

    if (error) {
      throw new BadRequestException(error);
    }
  }
}
