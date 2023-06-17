import { registerAs } from '@nestjs/config';
import { ConfigToken } from '../enums';
import { isEmpty } from 'class-validator';
import {
  InvalidAwsSQSEndPointError,
  InvalidAwsSQSSystemQueueNameError,
  InvalidAwsSQSUserQueueNameError,
} from './aws-sqs.config.error';

export class AwsSQSconfigFactory {
  constructor(private readonly processEnv: NodeJS.ProcessEnv = process.env) {}

  public static of() {
    return registerAs(ConfigToken.AWS_SQS, () => new AwsSQSconfigFactory());
  }

  get endPoint(): string {
    const val = this.processEnv.AWS_SQS_END_POINT;

    if (isEmpty(val)) {
      throw new InvalidAwsSQSEndPointError();
    }

    return val;
  }

  get userQueueName(): string {
    const val = this.processEnv.AWS_SQS_USER_QUEUE_NAME;

    if (isEmpty(val)) {
      throw new InvalidAwsSQSUserQueueNameError();
    }

    return val;
  }

  get systemQueueName(): string {
    const val = this.processEnv.AWS_SQS_SYSTEM_QUEUE_NAME;

    if (isEmpty(val)) {
      throw new InvalidAwsSQSSystemQueueNameError();
    }

    return val;
  }
}
