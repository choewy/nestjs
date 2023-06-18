import { AwsSQSConfig } from './aws-sqs-config';
import { InvalidAwsSQSEndPointError, InvalidAwsSQSQueueNameError } from './aws-sqs-config.error';

describe('AwsSQSConfig', () => {
  it('endpoint가 빈 문자열이면 InvalidAwsSQSEndPointError를 던진다.', () => {
    expect(() => AwsSQSConfig.of('', 'queueName')).toThrowError(InvalidAwsSQSEndPointError);
  });

  it('queueName이 빈 문자열이면 InvalidAwsSQSQueueNameError를 던진다.', () => {
    expect(() => AwsSQSConfig.of('endpoint', '')).toThrowError(InvalidAwsSQSQueueNameError);
  });

  it('endpoint가 빈 값이 아닌 경우 AwsSQSConfig 인스턴스를 반환한다.', () => {
    expect(AwsSQSConfig.of('endpoint', 'queueName')).toBeInstanceOf(AwsSQSConfig);
  });
});
