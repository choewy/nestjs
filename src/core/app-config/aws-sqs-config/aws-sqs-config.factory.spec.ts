import { AwsSQSconfigFactory } from './aws-sqs-config.factory';

import {
  InvalidAwsSQSEndPointError,
  InvalidAwsSQSSystemQueueNameError,
  InvalidAwsSQSUserQueueNameError,
} from './aws-sqs.config.error';

describe('AwsSQSConfigFactory', () => {
  describe('Throw Error Case', () => {
    it('환경변수에 AWS_SQS_END_POINT가 없으면 InvalidAwsSQSEndPointError를 던진다.', () => {
      expect(() => new AwsSQSconfigFactory({}).endPoint).toThrowError(InvalidAwsSQSEndPointError);
    });

    it('환경변수에 AWS_SQS_USER_QUEUE_NAME이 없으면 InvalidAwsSQSUserQueueNameError를 던진다.', () => {
      expect(() => new AwsSQSconfigFactory({}).userQueueName).toThrowError(InvalidAwsSQSUserQueueNameError);
    });

    it('환경변수에 AWS_SQS_SYSTEM_QUEUE_NAME이 없으면 InvalidAwsSQSSystemQueueNameError를 던진다.', () => {
      expect(() => new AwsSQSconfigFactory({}).systemQueueName).toThrowError(InvalidAwsSQSSystemQueueNameError);
    });
  });

  describe('Return Value Case', () => {
    it('환경변수에 AWS_SQS_END_POINT가 있으면 값을 반환한다.', () => {
      expect(new AwsSQSconfigFactory({ AWS_SQS_END_POINT: 'end-point' }).endPoint).toEqual('end-point');
    });
  });
});
