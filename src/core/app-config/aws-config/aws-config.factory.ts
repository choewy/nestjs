import { registerAs } from '@nestjs/config';
import { isEmpty } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';

export class AwsConfigFactory {
  public static of() {
    return registerAs(ConfigToken.AWS, () => new AwsConfigFactory());
  }

  get region(): string {
    const val = process.env.AWS_REGION;

    if (isEmpty(val)) {
      throw new InvalidAwsRegionError();
    }

    return val;
  }

  get accessKeyId(): string {
    const val = process.env.AWS_ACCESS_KEY_ID;

    if (isEmpty(val)) {
      throw new InvalidAwsAccessKeyIdError();
    }

    return val;
  }

  get secretAccessKey(): string {
    const val = process.env.AWS_SECRET_ACCESS_KEY;

    if (isEmpty(val)) {
      throw new InvalidAwsSecretAccessKeyError();
    }

    return val;
  }
}
