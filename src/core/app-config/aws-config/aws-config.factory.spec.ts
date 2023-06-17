import { InvalidAwsAccessKeyIdError, InvalidAwsRegionError, InvalidAwsSecretAccessKeyError } from './aws-config.error';
import { AwsConfigFactory } from './aws-config.factory';

describe('AwsConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 AWS_REGION이 없으면 InvalidAwsRegionError를 던진다.', () => {
      expect(() => new AwsConfigFactory().region).toThrowError(InvalidAwsRegionError);
    });

    it('환경변수에 AWS_ACCESS_KEY_ID가 없으면 InvalidAwsAccessKeyIdError를 던진다.', () => {
      expect(() => new AwsConfigFactory().accessKeyId).toThrowError(InvalidAwsAccessKeyIdError);
    });

    it('환경변수에 AWS_SECRET_ACCESS_KEY가 없으면 InvalidAwsSecretAccessKeyError를 던진다.', () => {
      expect(() => new AwsConfigFactory().secretAccessKey).toThrowError(InvalidAwsSecretAccessKeyError);
    });
  });

  describe('Return Value Case', () => {
    const AWS_REGION = 'region';
    const AWS_ACCESS_KEY_ID = 'accessKeyId';
    const AWS_SECRET_ACCESS_KEY = 'secretAccessKey';

    beforeAll(() => {
      process.env.AWS_REGION = AWS_REGION;
      process.env.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
      process.env.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
    });

    it('환경변수에 AWS_REGION가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory().region).toEqual(AWS_REGION);
    });

    it('환경변수에 AWS_ACCESS_KEY_ID가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory().accessKeyId).toEqual(AWS_ACCESS_KEY_ID);
    });

    it('환경변수에 AWS_SECRET_ACCESS_KEY가 있으면 값을 반환한다.', () => {
      expect(new AwsConfigFactory().secretAccessKey).toEqual(AWS_SECRET_ACCESS_KEY);
    });
  });
});
