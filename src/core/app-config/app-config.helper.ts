import { isEmpty, isEnum } from 'class-validator';

import { NodeEnv } from './enums';
import { InvalidNodeEnvError } from './app-config.error';

export class AppConfigHelper {
  public static get nodeEnv(): NodeEnv {
    const val = process.env.NODE_ENV;

    if (isEmpty(val) || !isEnum(val, NodeEnv)) {
      throw new InvalidNodeEnvError();
    }

    return val as NodeEnv;
  }

  public static get envFilePath(): string {
    const vals = ['.env'];

    switch (this.nodeEnv) {
      case NodeEnv.TEST:
        vals.push(this.nodeEnv);
        break;
    }

    return vals.join('.');
  }
}
