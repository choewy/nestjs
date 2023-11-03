import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { HostMessageEvent } from '@common/events';
import { AwsSQSQueueName } from '@common/enums';
import { AwsSQSConsumer, AwsSQSService } from '@core/aws-sqs';

import { HostEventHandler } from './host.event-handler';

@Injectable()
export class HostEventListener implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private readonly awsSQSConsumer: AwsSQSConsumer;

  constructor(private readonly awsSQSService: AwsSQSService, private readonly hostEventHandler: HostEventHandler) {
    this.awsSQSConsumer = this.awsSQSService.createConsumer(AwsSQSQueueName.Host, HostEventListener.name);
  }

  onApplicationBootstrap(): void {
    this.awsSQSConsumer.start();
  }

  beforeApplicationShutdown(): void {
    this.awsSQSConsumer.stop();
  }

  @OnEvent(HostMessageEvent.Subject, { suppressErrors: false })
  async onMessage(event: HostMessageEvent): Promise<void> {
    return this.hostEventHandler.handleMessage(event);
  }
}
