import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigHelper } from './app-config.helper';
import { AwsConfigFactory } from './aws-config';
import { ServerConfigFactory } from './server-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: AppConfigHelper.envFilePath,
      load: [ServerConfigFactory, AwsConfigFactory].map((factory) => factory.of()),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class AppConfigModule {}
