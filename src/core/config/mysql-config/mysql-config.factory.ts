import { isEmpty, isInt } from 'class-validator';
import { InvalidMySQLHostError, InvalidMySQLPortError, InvalidMySQLUserNameError } from './mysql-config.error';
import { registerAs } from '@nestjs/config';
import { ConfigToken, NodeEnv } from '../enums';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';
import { BaseDataSourceOptions } from 'typeorm/data-source/BaseDataSourceOptions';
import { LoggerOptions } from 'typeorm';

export class MySQLConfigFactory
  implements
    Pick<TypeOrmModuleOptions, 'type' | 'database' | 'namingStrategy' | 'autoLoadEntities' | 'entities'>,
    Partial<BaseDataSourceOptions & MysqlConnectionCredentialsOptions>
{
  public static of() {
    return registerAs(ConfigToken.MYSQL, () => new MySQLConfigFactory());
  }

  readonly type = 'mysql';
  readonly namingStrategy = new SnakeNamingStrategy();
  readonly logging: LoggerOptions = ['error', 'warn'];
  readonly autoLoadEntities = true;

  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password?: string;
  readonly synchronize: boolean;
  readonly dropSchema: boolean;
  readonly entities: string[];

  constructor(processEnv: NodeJS.ProcessEnv = process.env) {
    this.host = this.getHost(processEnv);
    this.port = this.getPort(processEnv);
    this.database = this.getDatabase(processEnv);
    this.username = this.getUsername(processEnv);
    this.password = this.getPassword(processEnv);
    this.synchronize = this.getSynchronize(processEnv);
    this.dropSchema = this.getDropSchema(processEnv);
    this.entities = this.getEntities(processEnv);
  }

  protected getHost(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.MYSQL_HOST;

    if (isEmpty(val)) {
      throw new InvalidMySQLHostError();
    }

    return val;
  }

  protected getPort(processEnv: NodeJS.ProcessEnv): number {
    const val = Number(processEnv.MYSQL_PORT);

    if (!isInt(val)) {
      throw new InvalidMySQLPortError();
    }

    return val;
  }

  protected getDatabase(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.MYSQL_DATABASE;

    if (isEmpty(val)) {
      throw new InvalidMySQLHostError();
    }

    return val;
  }

  protected getUsername(processEnv: NodeJS.ProcessEnv): string {
    const val = processEnv.MYSQL_USERNAME;

    if (isEmpty(val)) {
      throw new InvalidMySQLUserNameError();
    }

    return val;
  }

  protected getPassword(processEnv: NodeJS.ProcessEnv): string | undefined {
    return processEnv.MYSQL_PASSWORD || undefined;
  }

  protected getSynchronize(processEnv: NodeJS.ProcessEnv): boolean {
    return processEnv.MYSQL_SYNCHRONIZE === 'true';
  }

  protected getDropSchema(processEnv: NodeJS.ProcessEnv): boolean {
    return processEnv.MYSQL_DROP_SCHEMA === 'true';
  }

  protected getEntities(processEnv: NodeJS.ProcessEnv): string[] {
    return [processEnv.NODE_ENV === NodeEnv.LOCAL ? processEnv.MYSQL_LOCAL_ENTITIES : processEnv.MYSQL_TEST_ENTITIES];
  }
}
