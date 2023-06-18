import { Logger } from '@nestjs/common';

export class AwsSQSConstructor {
  protected logger = new Logger();
  protected contextName: string;
  protected queueUrl: string;

  constructor(context: string, endpoint: string, queueName: string) {
    this.contextName = [context, queueName].join(':');
    this.queueUrl = [endpoint, queueName].join('/');
  }
}
