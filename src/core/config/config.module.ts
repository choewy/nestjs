import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';

import { ConfigHelper } from './config.helper';
import { ServerConfigFactory } from './server-config';
import { AwsConfigFactory } from './aws-config';
import { AwsSQSconfigFactory } from './aws-sqs-config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ConfigHelper.envFilePath,
      load: [ServerConfigFactory, AwsConfigFactory, AwsSQSconfigFactory].map((factory) => factory.of()),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}