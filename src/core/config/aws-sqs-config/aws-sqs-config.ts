import { isEmpty } from 'class-validator';
import { InvalidAwsSQSEndPointError, InvalidAwsSQSQueueNameError } from './aws-sqs-config.error';

export class AwsSQSConfig {
  public static of(endpoint: string, queueName: string): AwsSQSConfig {
    return new AwsSQSConfig(endpoint, queueName);
  }

  readonly endpoint: string;
  readonly queueName: string;

  constructor(endpoint: string, queueName: string) {
    this.endpoint = this.getEndpoint(endpoint);
    this.queueName = this.getQueueName(queueName);
  }

  protected getEndpoint(endpoint: string): string {
    if (isEmpty(endpoint)) {
      throw new InvalidAwsSQSEndPointError();
    }

    return endpoint;
  }

  protected getQueueName(queueName: string): string {
    if (isEmpty(queueName)) {
      throw new InvalidAwsSQSQueueNameError();
    }

    return queueName;
  }
}
