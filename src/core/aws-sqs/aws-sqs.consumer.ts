import { Consumer } from 'sqs-consumer';
import { Message, SQS } from '@aws-sdk/client-sqs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';
import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsConfigFactory } from '../config';

export class AwsSQSConsumer extends AwsSQSConstructor {
  public static of(
    awsConfigFactory: AwsConfigFactory,
    endPoint: string,
    queueName: string,
    eventEmitter: EventEmitter2,
  ) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSConsumer(region, credentials, endPoint, queueName, eventEmitter);
  }

  private readonly consumer: Consumer;

  constructor(
    region: string,
    credentials: AwsSQSCredentials,
    endPoint: string,
    queueName: string,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super(AwsSQSConsumer.name, region, credentials, endPoint, queueName);

    this.consumer = Consumer.create({
      region,
      queueUrl: this.queueUrl,
      sqs: new SQS({ region, credentials, endpoint: this.endPoint }),
      handleMessage: this.handleMessage.bind(this),
      waitTimeSeconds: 0,
    });

    this.consumer.on('error', this.logger.error);
    this.consumer.on('processing_error', this.logger.error);
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
