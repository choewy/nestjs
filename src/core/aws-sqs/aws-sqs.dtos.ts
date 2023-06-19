import { plainToInstance } from 'class-transformer';

import { InvalidAwsSQSMessageBodyError } from './aws-sqs.error';
import { AwsConfigFactory } from '../config';

export class AwsSQSCredentials {
  public static of(awsConfigFactory: AwsConfigFactory): AwsSQSCredentials {
    return new AwsSQSCredentials(awsConfigFactory.accessKeyId, awsConfigFactory.secretAccessKey);
  }

  constructor(readonly accessKeyId: string, readonly secretAccessKey: string) {}
}

export class AwsSQSMessageBody<D = object> {
  public static to<D = object>(subject: string, data: D): AwsSQSMessageBody<D> {
    return new AwsSQSMessageBody(subject, data);
  }

  public static from<D = object>(messageBody: string): AwsSQSMessageBody<D> {
    const body = plainToInstance(AwsSQSMessageBody, JSON.parse(messageBody));

    if (!(body instanceof AwsSQSMessageBody)) {
      throw new InvalidAwsSQSMessageBodyError();
    }

    return new AwsSQSMessageBody(body.subject, body.data);
  }

  constructor(readonly subject: string, readonly data: D) {}
}

export class AwsSQSSendResult {
  public static of(uuid: string, messageId: string, data: string) {
    return new AwsSQSSendResult(uuid, messageId, data);
  }

  constructor(readonly uuid: string, readonly messageId: string, readonly data: string) {}
}
