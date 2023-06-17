import { NodeEnv } from './enums';

export class ConfigHelper {
  public static get nodeEnv(): NodeEnv {
    return process.env.NODE_ENV as NodeEnv;
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
