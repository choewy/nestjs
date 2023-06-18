import { Logger } from '@nestjs/common';
import { Consumer } from 'sqs-consumer';
import { SQS } from '@aws-sdk/client-sqs';

import { AwsSQSConfig } from '../config';
import { AwsSQSCredentials } from './aws-sqs.dtos';
import { AwsSQSConsumerMessageHandler } from './interfaces';

export class AwsSQSConstructor {
  protected readonly logger = new Logger();
  protected readonly contextName: string;
  protected readonly queueUrl: string;

  constructor(private readonly context: string, private readonly awsSQSConfig: AwsSQSConfig) {
    this.contextName = [this.context, this.awsSQSConfig.queueName].join(':');
    this.queueUrl = [this.awsSQSConfig.endpoint, this.awsSQSConfig.queueName].join('/');
  }

  private createSQSClient(region: string, credentials: AwsSQSCredentials): SQS {
    return new SQS({ region, credentials, endpoint: this.awsSQSConfig.endpoint });
  }

  protected createProducer(region: string, credentials: AwsSQSCredentials): SQS {
    return this.createSQSClient(region, credentials);
  }

  protected createConsumer(
    region: string,
    credentials: AwsSQSCredentials,
    handleMessage: AwsSQSConsumerMessageHandler,
  ): Consumer {
    const consumer = Consumer.create({
      region,
      handleMessage,
      waitTimeSeconds: 0,
      queueUrl: this.queueUrl,
      sqs: this.createSQSClient(region, credentials),
    });

    consumer.on('error', this.logger.error);
    consumer.on('processing_error', this.logger.error);

    return consumer;
  }
}
