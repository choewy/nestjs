import { registerAs } from '@nestjs/config';
import { isEmpty } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';

export class AwsConfigFactory {
  public static of() {
    return registerAs(ConfigToken.AWS, () => new AwsConfigFactory());
  }

  readonly region: string;
  readonly accessKeyId: string;
  readonly secretAccessKey: string;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.region = this.getRegion(processEnv);
    this.accessKeyId = this.getAccessKeyId(processEnv);
    this.secretAccessKey = this.getSecretAccessKey(processEnv);
  }

  protected getRegion(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.AWS_REGION;

    if (isEmpty(val)) {
      throw new InvalidAwsRegionError();
    }

    return val;
  }

  protected getAccessKeyId(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.AWS_ACCESS_KEY_ID;

    if (isEmpty(val)) {
      throw new InvalidAwsAccessKeyIdError();
    }

    return val;
  }

  protected getSecretAccessKey(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.AWS_SECRET_ACCESS_KEY;

    if (isEmpty(val)) {
      throw new InvalidAwsSecretAccessKeyError();
    }

    return val;
  }
}
