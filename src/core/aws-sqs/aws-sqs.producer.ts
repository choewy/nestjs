import { v4 } from 'uuid';
import { SQS } from '@aws-sdk/client-sqs';

import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';
import { AwsConfigFactory } from '../config';
import { Logger } from '@nestjs/common';

export class AwsSQSProducer {
  public static of(awsConfigFactory: AwsConfigFactory, endPoint: string, queueName: string) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSProducer(region, credentials, endPoint, queueName);
  }

  private readonly logger = new Logger();
  private readonly producer: SQS;

  constructor(
    region: string,
    credentials: AwsSQSCredentials,
    private readonly endPoint: string,
    private readonly queueName: string,
  ) {
    this.producer = new SQS({ region, credentials, endpoint: this.endPoint });
  }
  private get contextName(): string {
    return [AwsSQSProducer.name, this.queueName].join(':');
  }

  private get queueUrl(): string {
    return [this.endPoint, this.queueName].join('/');
  }

  async sendMessage(messageBody: AwsSQSMessageBody): Promise<void> {
    try {
      const id = v4();

      const response = await this.producer.sendMessage({
        QueueUrl: this.queueUrl,
        MessageGroupId: id,
        MessageDeduplicationId: id,
        MessageBody: JSON.stringify(messageBody),
      });

      this.logger.debug(JSON.stringify({ messageId: response.MessageId, messageBody }, null, 2), this.contextName);
    } catch (e) {
      this.logger.error(JSON.stringify({ error: e }, null, 2), e.stack, this.contextName);
    }
  }
}
