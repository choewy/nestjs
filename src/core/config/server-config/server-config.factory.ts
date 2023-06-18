import { registerAs } from '@nestjs/config';
import { isEmpty, isInt } from 'class-validator';

import { ConfigToken } from '../enums';

import { InvalidServerHostError, InvalidServerPortError } from './server-config.error';

export class ServerConfigFactory {
  public static of() {
    return registerAs(ConfigToken.SERVER, () => new ServerConfigFactory());
  }

  readonly host: string;
  readonly port: number;

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.host = this.getHost(processEnv);
    this.port = this.getPort(processEnv);
  }

  protected getHost(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.SERVER_HOST;

    if (isEmpty(val)) {
      throw new InvalidServerHostError();
    }

    return val;
  }

  protected getPort(processEnv: NodeJS.ProcessEnv): number {
    const val = Number(processEnv.SERVER_PORT);

    if (!isInt(val)) {
      throw new InvalidServerPortError();
    }

    return val;
  }
}
