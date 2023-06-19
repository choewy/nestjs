import { Consumer } from 'sqs-consumer';
import { Message } from '@aws-sdk/client-sqs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsConfigFactory, AwsSQSConfig } from '../config';

import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';
import { AwsSQSLogServiceImpl } from './interfaces';

export class AwsSQSConsumer extends AwsSQSConstructor {
  public static of(
    consumerName: string,
    awsConfigFactory: AwsConfigFactory,
    awsSQSConfig: AwsSQSConfig,
    awsSQSLogService: AwsSQSLogServiceImpl,
    eventEmitter: EventEmitter2,
  ) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSConsumer(consumerName, region, credentials, awsSQSConfig, awsSQSLogService, eventEmitter);
  }

  private readonly consumer: Consumer;

  constructor(
    private readonly consumerName: string,
    region: string,
    credentials: AwsSQSCredentials,
    awsSQSConfig: AwsSQSConfig,
    awsSQSLogService: AwsSQSLogServiceImpl,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(AwsSQSConsumer.name, awsSQSConfig, awsSQSLogService);

    this.consumer = super.createConsumer(region, credentials, this.handleMessage.bind(this));

    setInterval(() => {
      if (!this.consumer.isRunning) {
        this.consumer.start();
      }
    }, 1000);
  }

  public close(): void {
    if (this.consumer && this.consumer.isRunning) {
      this.consumer.stop();
    }
  }

  private async handleMessage(message: Message): Promise<void> {
    const messageId = message.MessageId;
    await this.awsSQSLogService.consumeOk(messageId, this.consumerName);

    try {
      const messageBody = AwsSQSMessageBody.from(message.Body);
      await this.eventEmitter.emitAsync(messageBody.subject, messageId, messageBody.data);
      await this.awsSQSLogService.processingOk(messageId);
    } catch (e) {
      await this.awsSQSLogService.processingFail(messageId, e);
    }
  }
}
