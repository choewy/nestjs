import { v4 } from 'uuid';
import { SQS } from '@aws-sdk/client-sqs';

import { AwsConfigFactory, AwsSQSConfig } from '../config';

import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';

export class AwsSQSProducer extends AwsSQSConstructor {
  public static of(awsConfigFactory: AwsConfigFactory, awsSQSConfig: AwsSQSConfig) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSProducer(region, credentials, awsSQSConfig);
  }

  private readonly producer: SQS;

  constructor(region: string, credentials: AwsSQSCredentials, awsSQSConfig: AwsSQSConfig) {
    super(AwsSQSProducer.name, awsSQSConfig);

    this.producer = this.createProducer(region, credentials);
  }

  async send(subject: string, data: object): Promise<void> {
    try {
      const id = v4();

      const response = await this.producer.sendMessage({
        QueueUrl: this.queueUrl,
        MessageGroupId: id,
        MessageDeduplicationId: id,
        MessageBody: JSON.stringify(AwsSQSMessageBody.to(subject, data)),
      });

      this.logger.debug(JSON.stringify({ messageId: response.MessageId }, null, 2), this.contextName);
    } catch (e) {
      this.logger.error(JSON.stringify({ error: e }, null, 2), e.stack, this.contextName);
    }
  }
}
