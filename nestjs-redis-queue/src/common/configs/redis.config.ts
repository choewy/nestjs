import { ConfigService } from '@nestjs/config';
import { BullModuleOptions } from '@nestjs/bull';

export class RedisConfig {
  private readonly configService = new ConfigService();

  private readonly REDIS_HOST = this.configService.get<string>('REDIS_HOST');
  private readonly REDIS_PORT = this.configService.get<string>('REDIS_PORT');
  private readonly REDIS_USERNAME = this.configService.get<string>('REDIS_USERNAME');
  private readonly REDIS_PASSWORD = this.configService.get<string>('REDIS_PASSWORD');
  private readonly REDIS_DB = this.configService.get<string>('REDIS_DB');

  public getBullModuleOptions(): BullModuleOptions {
    return {
      prefix: 'queue',
      redis: {
        host: this.REDIS_HOST,
        port: Number(this.REDIS_PORT),
        username: this.REDIS_USERNAME,
        password: this.REDIS_PASSWORD,
        db: Number(this.REDIS_DB),
      },
    };
  }
}
