import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from './config.module';
import { ConfigToken } from './enums';
import { ServerConfigFactory } from './server-config';
import { AwsConfigFactory } from './aws-config';
import { AwsSQSConfigFactory } from './aws-sqs-config';

describe('ConfigModule', () => {
  let configModule: ConfigModule;
  let configService: ConfigService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
    }).compile();

    configModule = app.get(ConfigModule);
    configService = app.get(ConfigService);
  });

  it('ConfigModule이 정의되어 있어야 한다.', () => {
    expect(configModule).toBeDefined();
  });

  it('ConfigService가 정의되어 있어야 한다.', () => {
    expect(configService).toBeDefined();
  });

  it('ServerConfigFactory를 불러올 수 있어야 한다.', () => {
    expect(configService.get(ConfigToken.SERVER)).toBeInstanceOf(ServerConfigFactory);
  });

  it('AwsConfigFactory를 불러올 수 있어야 한다.', () => {
    expect(configService.get(ConfigToken.AWS)).toBeInstanceOf(AwsConfigFactory);
  });

  it('AwsSQSConfigFactory를 불러올 수 있어야 한다.', () => {
    expect(configService.get(ConfigToken.AWS_SQS)).toBeInstanceOf(AwsSQSConfigFactory);
  });
});
