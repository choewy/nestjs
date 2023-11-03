import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export class MongoConfig {
  private readonly configService = new ConfigService();

  private readonly MONGO_PROTOCOL = this.configService.get<string>('MONGO_PROTOCOL');
  private readonly MONGO_HOST = this.configService.get<string>('MONGO_HOST');
  private readonly MONGO_PORT = this.configService.get<string>('MONGO_PORT');
  private readonly MONGO_USERNAME = this.configService.get<string>('MONGO_USERNAME');
  private readonly MONGO_PASSWORD = this.configService.get<string>('MONGO_PASSWORD');

  public getModuleOptions(dbName?: string, connectionName?: string): [string, MongooseModuleOptions] {
    return [
      `${this.MONGO_PROTOCOL}://${this.MONGO_USERNAME}:${this.MONGO_PASSWORD}@${this.MONGO_HOST}:${this.MONGO_PORT}`,
      { dbName, connectionName },
    ];
  }
}
