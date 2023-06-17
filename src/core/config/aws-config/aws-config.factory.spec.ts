import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';
import { AwsConfigFactory } from './aws-config.factory';

describe('AwsConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 AWS_REGION이 없으면 InvalidAwsRegionError를 던진다.', () => {
      expect(() => new AwsConfigFactory({}).region).toThrowError(InvalidAwsRegionError);
    });

    it('환경변수에 AWS_ACCESS_KEY_ID가 없으면 InvalidAwsAccessKeyIdError를 던진다.', () => {
      expect(() => new AwsConfigFactory({}).accessKeyId).toThrowError(InvalidAwsAccessKeyIdError);
    });

    it('환경변수에 AWS_SECRET_ACCESS_KEY가 없으면 InvalidAwsSecretAccessKeyError를 던진다.', () => {
      expect(() => new AwsConfigFactory({}).secretAccessKey).toThrowError(InvalidAwsSecretAccessKeyError);
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 AWS_REGION가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory({ AWS_REGION: 'region' }).region).toEqual('region');
    });

    it('환경변수에 AWS_ACCESS_KEY_ID가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory({ AWS_ACCESS_KEY_ID: 'accessKeyId' }).accessKeyId).toEqual('accessKeyId');
    });

    it('환경변수에 AWS_SECRET_ACCESS_KEY가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory({ AWS_SECRET_ACCESS_KEY: 'secretAccessKey' }).secretAccessKey).toEqual(
        'secretAccessKey',
      );
    });
  });
});
