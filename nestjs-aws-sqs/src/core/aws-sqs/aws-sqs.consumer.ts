import { Consumer } from 'sqs-consumer';
import { Message, SQS } from '@aws-sdk/client-sqs';

import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsSQSQueueName } from '@common/enums';
import { AwsSQSConfig } from '@common/configs';

import { AwsSQSMessageBody } from './types';
import { AwsSQSConsumeError, AwsSQSConsumerError, AwsSQSProcessingFailError } from './errors';
import { AwsSQSLogService } from './aws-sqs-log.service';

export class AwsSQSConsumer {
  private readonly consumer: Consumer;

  constructor(
    readonly awsSQSConfig: AwsSQSConfig,
    readonly queueName: AwsSQSQueueName,
    readonly consumerName: string,
    private readonly awsSQSLogService: AwsSQSLogService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.consumer = new Consumer(
      this.awsSQSConfig.getConsumerOptions(queueName, {
        sqs: new SQS(this.awsSQSConfig.getClientOptions()),
        handleMessage: this.handleMessage.bind(this),
      }),
    );

    this.consumer.on('error', this.handleError.bind(this));
    this.consumer.on('processing_error', this.handleError.bind(this));
  }

  public start(): void {
    this.consumer.start();
  }

  public stop(): void {
    this.consumer.stop();
  }

  private async handleMessage(message: Message) {
    let subject: string;
    let payload: unknown;

    try {
      const messageBody = JSON.parse(message.Body) as AwsSQSMessageBody<unknown>;

      subject = messageBody.subject;
      payload = messageBody.payload;

      await this.awsSQSLogService.updateAfterConsume(message.MessageId, this.consumerName);
    } catch (e) {
      await this.awsSQSLogService.updateAfterError(message.MessageId, new AwsSQSConsumeError(e));
    }

    if (!subject || !payload) {
      return;
    }

    try {
      await this.eventEmitter.emitAsync(subject, payload);
      await this.awsSQSLogService.updateAfterComplete(message.MessageId);
    } catch (e) {
      await this.awsSQSLogService.updateAfterFail(message.MessageId, new AwsSQSProcessingFailError(e));
    }
  }

  private async handleError(error: Error, messages: undefined | Message | Message[]) {
    if (messages === undefined) {
      return;
    }

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    await Promise.all(
      messages.map((message) =>
        this.awsSQSLogService.updateAfterError(message.MessageId, new AwsSQSConsumerError(error), {
          consumerName: this.consumerName,
        }),
      ),
    );
  }
}
