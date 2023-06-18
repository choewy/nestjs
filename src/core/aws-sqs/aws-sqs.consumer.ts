import { Consumer } from 'sqs-consumer';
import { Message } from '@aws-sdk/client-sqs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsConfigFactory, AwsSQSConfig } from '../config';

import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';

export class AwsSQSConsumer extends AwsSQSConstructor {
  public static of(awsConfigFactory: AwsConfigFactory, awsSQSConfig: AwsSQSConfig, eventEmitter: EventEmitter2) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSConsumer(region, credentials, awsSQSConfig, eventEmitter);
  }

  private readonly consumer: Consumer;

  constructor(
    region: string,
    credentials: AwsSQSCredentials,
    awsSQSConfig: AwsSQSConfig,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(AwsSQSConsumer.name, awsSQSConfig);

    this.consumer = super.createConsumer(region, credentials, this.handleMessage.bind(this));
    this.consumer.start();
  }

  public close(): void {
    if (this.consumer) {
      this.consumer.stop();
    }
  }

  private async handleMessage(message: Message): Promise<void> {
    const messageId = message.MessageId;

    try {
      const messageBody = AwsSQSMessageBody.from(message.Body);

      this.logger.verbose(JSON.stringify({ messageId, ...messageBody }, null, 2), this.contextName);

      await this.eventEmitter.emitAsync(messageBody.subject, messageBody.data);
    } catch (e) {
      this.logger.error(JSON.stringify({ messageId, error: e }, null, 2), e.stack, this.contextName);
    }
  }
}
