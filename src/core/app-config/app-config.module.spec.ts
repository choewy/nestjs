import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigModule } from './app-config.module';
import { ConfigToken } from './enums';
import { ServerConfigFactory } from './server-config';
import { AwsConfigFactory } from './aws-config';

describe('AppConfigModule', () => {
  let appConfigModule: AppConfigModule;
  let configService: ConfigService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppConfigModule],
    }).compile();

    appConfigModule = app.get(AppConfigModule);
    configService = app.get(ConfigService);
  });

  it('AppConfigModule이 정의되어 있어야 한다.', () => {
    expect(appConfigModule).toBeDefined();
  });

  it('ConfigService가 정의되어 있어야 한다.', () => {
    expect(configService).toBeDefined();
  });

  describe('ServerConfigFactory', () => {
    let serverConfigFactory: ServerConfigFactory;

    beforeAll(() => {
      serverConfigFactory = configService.get<ServerConfigFactory>(ConfigToken.SERVER);
    });

    it('ServerConfigFactory를 불러올 수 있어야 한다.', () => {
      expect(serverConfigFactory).toBeInstanceOf(ServerConfigFactory);
    });

    it('ServerConfigFactory에서 port를 가져올 수 있어야 한다.', () => {
      expect(serverConfigFactory.port).not.toBeUndefined();
    });

    it('ServerConfigFactory에서 host를 가져올 수 있어야 한다.', () => {
      expect(serverConfigFactory.port).not.toBeUndefined();
    });
  });

  describe('AwsConfigFactory', () => {
    let awsConfigFactory: AwsConfigFactory;

    beforeAll(() => {
      awsConfigFactory = configService.get<AwsConfigFactory>(ConfigToken.AWS);
    });

    it('AwsConfigFactory를 불러올 수 있어야 한다.', () => {
      expect(awsConfigFactory).toBeInstanceOf(AwsConfigFactory);
    });

    it('AwsConfigFactory에서 region를 가져올 수 있어야 한다.', () => {
      expect(awsConfigFactory.region).not.toBeUndefined();
    });

    it('AwsConfigFactory에서 accessKeyId를 가져올 수 있어야 한다.', () => {
      expect(awsConfigFactory.accessKeyId).not.toBeUndefined();
    });

    it('AwsConfigFactory에서 secretAccessKey를 가져올 수 있어야 한다.', () => {
      expect(awsConfigFactory.secretAccessKey).not.toBeUndefined();
    });
  });
});
