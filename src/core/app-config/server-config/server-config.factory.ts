import { registerAs } from '@nestjs/config';
import { isEmpty, isEnum, isInt } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidServerHostError, InvalidNodeEnvError, InvalidServerPortError } from './server-config.error';
import { NodeEnv } from './enums';

export class ServerConfigFactory {
  public static of() {
    return registerAs(ConfigToken.SERVER, () => new ServerConfigFactory());
  }

  get env(): NodeEnv {
    const val = process.env.NODE_ENV;

    if (isEmpty(val) || !isEnum(val, NodeEnv)) {
      throw new InvalidNodeEnvError();
    }

    return val as NodeEnv;
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
