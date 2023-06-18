import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';
import { AwsConfigFactory } from './aws-config.factory';

const AWS_REGION = 'region';
const AWS_ACCESS_KEY_ID = 'access-key-id';
const AWS_SECRET_ACCESS_KEY = 'secret-access-key';

describe('AwsConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 AWS_REGION이 없으면 InvalidAwsRegionError를 던진다.', () => {
      expect(() => new AwsConfigFactory({ AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY })).toThrowError(
        InvalidAwsRegionError,
      );
    });

    it('환경변수에 AWS_ACCESS_KEY_ID가 없으면 InvalidAwsAccessKeyIdError를 던진다.', () => {
      expect(() => new AwsConfigFactory({ AWS_REGION, AWS_SECRET_ACCESS_KEY })).toThrowError(
        InvalidAwsAccessKeyIdError,
      );
    });

    it('환경변수에 AWS_SECRET_ACCESS_KEY가 없으면 InvalidAwsSecretAccessKeyError를 던진다.', () => {
      expect(() => new AwsConfigFactory({ AWS_REGION, AWS_ACCESS_KEY_ID })).toThrowError(
        InvalidAwsSecretAccessKeyError,
      );
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 AWS_*가 모두 있으면 AwsConfigFactory 인스턴스를 반환한다.', () => {
      expect(new AwsConfigFactory({ AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY })).toBeInstanceOf(
        AwsConfigFactory,
      );
    });
  });
});
