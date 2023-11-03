import { SQSClientConfig } from '@aws-sdk/client-sqs';

import { ConfigService } from '@nestjs/config';
import { ConsumerOptions } from 'sqs-consumer';

export class AwsSQSConfig {
  private readonly configService = new ConfigService();

  private readonly AWS_SQS_REGION = this.configService.get<string>('AWS_SQS_REGION');
  private readonly AWS_SQS_ACCES_KEY_ID = this.configService.get<string>('AWS_SQS_ACCES_KEY_ID');
  private readonly AWS_SQS_SECRET_ACCESS_KEY = this.configService.get<string>('AWS_SQS_SECRET_ACCESS_KEY');
  private readonly AWS_SQS_ENDPOINT = this.configService.get<string>('AWS_SQS_ENDPOINT');

  public getCredentials() {
    return {
      accessKeyId: this.AWS_SQS_ACCES_KEY_ID,
      secretAccessKey: this.AWS_SQS_SECRET_ACCESS_KEY,
    };
  }

  public getClientOptions(): SQSClientConfig {
    return {
      region: this.AWS_SQS_REGION,
      endpoint: this.AWS_SQS_ENDPOINT,
      credentials: this.getCredentials(),
    };
  }

  public getQueueUrl(queueName: string) {
    return [this.AWS_SQS_ENDPOINT, queueName].join('/');
  }

  public getConsumerOptions(
    queueName: string,
    options: Pick<ConsumerOptions, 'handleMessage' | 'sqs'>,
  ): ConsumerOptions {
    return {
      region: this.AWS_SQS_REGION,
      queueUrl: this.getQueueUrl(queueName),
      ...options,
    };
  }
}
