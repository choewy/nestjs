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
    this.host = processEnv.SERVER_HOST;
    this.port = Number(processEnv.SERVER_PORT);

    this.validateHost();
    this.validatePort();
  }

  private validateHost(): void {
    if (isEmpty(this.host)) {
      throw new InvalidServerHostError();
    }
  }

  private validatePort(): void {
    if (!isInt(this.port)) {
      throw new InvalidServerPortError();
    }
  }
}
