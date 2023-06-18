import { isEmpty } from 'class-validator';
import { InvalidAwsSQSEndPointError, InvalidAwsSQSQueueNameError } from './aws-sqs-config.error';

export class AwsSQSConfig {
  public static of(endpoint: string, queueName: string): AwsSQSConfig {
    return new AwsSQSConfig(endpoint, queueName);
  }

  constructor(public readonly endpoint: string, public readonly queueName: string) {
    this.validateEndPoint();
    this.validateQueueName();
  }

  protected validateEndPoint(): void {
    if (isEmpty(this.endpoint)) {
      throw new InvalidAwsSQSEndPointError();
    }
  }

  protected validateQueueName(): void {
    if (isEmpty(this.queueName)) {
      throw new InvalidAwsSQSQueueNameError();
    }
  }
}
