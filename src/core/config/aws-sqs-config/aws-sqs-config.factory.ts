import { registerAs } from '@nestjs/config';
import { ConfigToken } from '../enums';

import { AwsSQSConfigFactoryProperty } from './enums';
import { AwsSQSConfig } from './aws-sqs-config';

export class AwsSQSConfigFactory implements Record<AwsSQSConfigFactoryProperty, AwsSQSConfig> {
  public static of() {
    return registerAs(ConfigToken.AWS_SQS, () => new AwsSQSConfigFactory());
  }

  public readonly systemQueue: AwsSQSConfig;
  public readonly userQueue: AwsSQSConfig;

  constructor(private readonly processEnv: NodeJS.ProcessEnv = process.env) {
    this.systemQueue = AwsSQSConfig.of(this.processEnv.AWS_SQS_END_POINT, this.processEnv.AWS_SQS_SYSTEM_QUEUE_NAME);
    this.userQueue = AwsSQSConfig.of(this.processEnv.AWS_SQS_END_POINT, this.processEnv.AWS_SQS_USER_QUEUE_NAME);
  }
}
