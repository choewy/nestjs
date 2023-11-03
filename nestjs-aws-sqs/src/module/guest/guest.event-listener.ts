import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { GuestMessageEvent } from '@common/events';
import { AwsSQSQueueName } from '@common/enums';
import { AwsSQSConsumer, AwsSQSService } from '@core/aws-sqs';

import { GuestEventHandler } from './guest.event-handler';

@Injectable()
export class GuestEventListener implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly awsSQSConsumer: AwsSQSConsumer;

  constructor(private readonly awsSQSService: AwsSQSService, private readonly guestEventHandler: GuestEventHandler) {
    this.awsSQSConsumer = this.awsSQSService.createConsumer(AwsSQSQueueName.Guest, GuestEventListener.name);
  }

  onApplicationBootstrap(): void {
    this.awsSQSConsumer.start();
  }

  beforeApplicationShutdown(): void {
    this.awsSQSConsumer.stop();
  }

  @OnEvent(GuestMessageEvent.Subject, { suppressErrors: false })
  async onMessage(event: GuestMessageEvent): Promise<void> {
    return this.guestEventHandler.handleMessage(event);
  }
}
