import { SQS } from '@aws-sdk/client-sqs';

import { AwsSQSConfig } from '@common/configs';
import { AwsSQSQueueName } from '@common/enums';

import { AwsSQSProduceError } from './errors';
import { AwsSQSLogService } from './aws-sqs-log.service';

export class AwsSQSProducer extends SQS {
  readonly queueUrl: string;

  constructor(
    readonly awsSQSConfig: AwsSQSConfig,
    readonly producerName: string,
    readonly awsSQSLogService: AwsSQSLogService,
  ) {
    super(awsSQSConfig.getClientOptions());
  }

  async sendMsg<S extends string, T>(
    queueName: AwsSQSQueueName,
    subject: S,
    payload: T,
  ): Promise<AwsSQSProduceError | null> {
    let error: AwsSQSProduceError | null;

    const awsSQSLog = await this.awsSQSLogService.init(subject, payload);

    try {
      const message = await super.sendMessage({
        QueueUrl: this.awsSQSConfig.getQueueUrl(queueName),
        MessageGroupId: awsSQSLog.id,
        MessageDeduplicationId: awsSQSLog.id,
        MessageBody: JSON.stringify({ subject, payload }),
      });

      await this.awsSQSLogService.updateAfterProduce(awsSQSLog.id, message.MessageId, this.producerName);
    } catch (e) {
      error = new AwsSQSProduceError(e);

      await this.awsSQSLogService.updateAfterError(awsSQSLog.id, error, {
        producerName: this.producerName,
      });
    }

    return error;
  }
}
