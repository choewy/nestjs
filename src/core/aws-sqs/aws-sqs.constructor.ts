import { Logger } from '@nestjs/common';
import { AwsSQSCredentials } from './aws-sqs.dtos';

export class AwsSQSConstructor {
  protected logger = new Logger();

  constructor(
    private context: string,
    protected region: string,
    protected credentials: AwsSQSCredentials,
    protected readonly endPoint: string,
    protected readonly queueName: string,
  ) {}

  protected get contextName(): string {
    return [this.context, this.queueName].join(':');
  }

  protected get queueUrl(): string {
    return [this.endPoint, this.queueName].join('/');
  }
}
