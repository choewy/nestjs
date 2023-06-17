import { registerAs } from '@nestjs/config';
import { isEmpty, isInt } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidServerHostError, InvalidServerPortError } from './server-config.error';

export class ServerConfigFactory {
  constructor(private readonly processEnv: NodeJS.ProcessEnv = process.env) {}

  public static of() {
    return registerAs(ConfigToken.SERVER, () => new ServerConfigFactory());
  }

  get host(): string {
    const val = this.processEnv.SERVER_HOST;

    if (isEmpty(val)) {
      throw new InvalidServerHostError();
    }

    return val;
  }

  get port(): number {
    const val = Number(this.processEnv.SERVER_PORT);

    if (isEmpty(val) || !isInt(val)) {
      throw new InvalidServerPortError();
    }

    return val;
  }
}
