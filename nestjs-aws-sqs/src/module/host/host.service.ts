import { BadRequestException, BeforeApplicationShutdown, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { AwsSQSQueueName } from '@common/enums';
import { GuestMessageEvent } from '@common/events';

import { AwsSQSConsumer, AwsSQSProducer, AwsSQSService } from '@core/aws-sqs';

@Injectable()
export class HostService implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly awsSQSProducer: AwsSQSProducer;
  private readonly awsSQSConsumer: AwsSQSConsumer;

  constructor(private readonly awsSQSService: AwsSQSService) {
    this.awsSQSProducer = this.awsSQSService.createProducer(HostService.name);
    this.awsSQSConsumer = this.awsSQSService.createConsumer(AwsSQSQueueName.Host, HostService.name);
  }

  onApplicationBootstrap(): void {
    this.awsSQSConsumer.start();
  }

  beforeApplicationShutdown(): void {
    this.awsSQSConsumer.stop();
  }

  async sendMessageToGuest(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    const error = await this.awsSQSProducer.sendMsg(
      AwsSQSQueueName.Guest,
      GuestMessageEvent.Subject,
      new GuestMessageEvent(message),
    );

    if (error) {
      throw new BadRequestException(error);
    }
  }
}
