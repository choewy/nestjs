import { registerAs } from '@nestjs/config';
import { isEmpty, isInt } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidServerHostError, InvalidServerPortError } from './server-config.error';

export class ServerConfigFactory {
  public static of() {
    return registerAs(ConfigToken.SERVER, () => new ServerConfigFactory());
  }

  get host(): string {
    const val = process.env.SERVER_HOST;

    if (isEmpty(val)) {
      throw new InvalidServerHostError();
    }

    return val;
  }

  get port(): number {
    const val = Number(process.env.SERVER_PORT);

    if (isEmpty(val) || !isInt(val)) {
      throw new InvalidServerPortError();
    }

    return val;
  }
}
