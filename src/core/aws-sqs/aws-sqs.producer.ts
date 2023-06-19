import { v4 } from 'uuid';
import { SQS } from '@aws-sdk/client-sqs';

import { AwsConfigFactory, AwsSQSConfig } from '../config';

import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsSQSCredentials, AwsSQSMessageBody } from './aws-sqs.dtos';
import { AwsSQSLogServiceImpl } from './interfaces';

export class AwsSQSProducer extends AwsSQSConstructor {
  public static of(
    producerName: string,
    awsConfigFactory: AwsConfigFactory,
    awsSQSConfig: AwsSQSConfig,
    awsSQSLogService: AwsSQSLogServiceImpl,
  ) {
    const region = awsConfigFactory.region;
    const credentials = AwsSQSCredentials.of(awsConfigFactory);

    return new AwsSQSProducer(producerName, region, credentials, awsSQSConfig, awsSQSLogService);
  }

  private readonly producer: SQS;

  constructor(
    private readonly producerName: string,
    region: string,
    credentials: AwsSQSCredentials,
    awsSQSConfig: AwsSQSConfig,
    awsSQSLogService: AwsSQSLogServiceImpl,
  ) {
    super(AwsSQSProducer.name, awsSQSConfig, awsSQSLogService);

    this.producer = this.createProducer(region, credentials);
  }

  async send(subject: string, data: object): Promise<void> {
    const uuid = v4();

    await this.awsSQSLogService.pending(uuid, this.producerName, subject, data);

    try {
      const body = AwsSQSMessageBody.to(subject, data);
      const response = await this.producer.sendMessage({
        QueueUrl: this.queueUrl,
        MessageGroupId: uuid,
        MessageDeduplicationId: uuid,
        MessageBody: JSON.stringify(body),
      });

      await this.awsSQSLogService.sendOk(uuid, response.MessageId);
    } catch (e) {
      await this.awsSQSLogService.sendFail(uuid, e);
    }
  }
}
