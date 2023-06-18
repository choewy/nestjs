import { AwsSQSConfigFactory } from './aws-sqs-config.factory';

import { InvalidAwsSQSEndPointError, InvalidAwsSQSQueueNameError } from './aws-sqs-config.error';
import { AwsSQSConfig } from './aws-sqs-config';

const AWS_SQS_END_POINT = 'endpoint';
const AWS_SQS_USER_QUEUE_NAME = 'user-queue';
const AWS_SQS_SYSTEM_QUEUE_NAME = 'system-queue';

describe('AwsSQSConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 AWS_SQS_END_POINT가 없으면 InvalidAwsSQSEndPointError를 던진다.', () => {
      const processEnv = { AWS_SQS_USER_QUEUE_NAME, AWS_SQS_SYSTEM_QUEUE_NAME };

      expect(() => new AwsSQSConfigFactory(processEnv)).toThrowError(InvalidAwsSQSEndPointError);
    });

    it('환경변수에 AWS_SQS_USER_QUEUE_NAME이 없으면 InvalidAwsSQSQueueNameError를 던진다.', () => {
      const processEnv = { AWS_SQS_END_POINT, AWS_SQS_SYSTEM_QUEUE_NAME };

      expect(() => new AwsSQSConfigFactory(processEnv)).toThrowError(InvalidAwsSQSQueueNameError);
    });

    it('환경변수에 AWS_SQS_SYSTEM_QUEUE_NAME이 없으면 InvalidAwsSQSSystemQueueNameError를 던진다.', () => {
      const processEnv = { AWS_SQS_END_POINT, AWS_SQS_USER_QUEUE_NAME };

      expect(() => new AwsSQSConfigFactory(processEnv)).toThrowError(InvalidAwsSQSQueueNameError);
    });
  });

  describe('Return Value Case', () => {
    const awsSQSConfigFactory = new AwsSQSConfigFactory({
      AWS_SQS_END_POINT,
      AWS_SQS_SYSTEM_QUEUE_NAME,
      AWS_SQS_USER_QUEUE_NAME,
    });

    it('환경변수에 AWS_SQS_* 값이 모두 있으면 AwsSQSConfigFactory 인스턴스를 생성한다.', () => {
      expect(awsSQSConfigFactory).toBeInstanceOf(AwsSQSConfigFactory);
    });

    it('userQueue는 AwsSQSConfig 인스턴스로 생성되어야 한다.', () => {
      expect(awsSQSConfigFactory.userQueue).toBeInstanceOf(AwsSQSConfig);
    });

    it('systemQueue는 AwsSQSConfig 인스턴스로 생성되어야 한다.', () => {
      expect(awsSQSConfigFactory.systemQueue).toBeInstanceOf(AwsSQSConfig);
    });
  });
});
