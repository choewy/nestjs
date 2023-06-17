import { registerAs } from '@nestjs/config';
import { isEmpty } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';

export class AwsConfigFactory {
  constructor(private readonly processEnv: NodeJS.ProcessEnv = process.env) {}

  public static of() {
    return registerAs(ConfigToken.AWS, () => new AwsConfigFactory());
  }

  get region(): string {
    const val = this.processEnv.AWS_REGION;

    if (isEmpty(val)) {
      throw new InvalidAwsRegionError();
    }

    return val;
  }

  get accessKeyId(): string {
    const val = this.processEnv.AWS_ACCESS_KEY_ID;

    if (isEmpty(val)) {
      throw new InvalidAwsAccessKeyIdError();
    }

    return val;
  }

  get secretAccessKey(): string {
    const val = this.processEnv.AWS_SECRET_ACCESS_KEY;

    if (isEmpty(val)) {
      throw new InvalidAwsSecretAccessKeyError();
    }

    return val;
  }
}
