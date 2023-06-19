import { AwsConfigFactory, AwsSQSConfig } from '../config';
import { AwsSQSConstructor } from './aws-sqs.constructor';
import { AwsSQSCredentials } from './aws-sqs.dtos';
import { AwsSQSConsumerMessageHandler } from './interfaces';

class AwsSQSTestConstructor extends AwsSQSConstructor {
  testContextName(): string {
    return this.contextName;
  }

  testQueueUrl(): string {
    return this.queueUrl;
  }

  testCreateProducer(region: string, credentials: AwsSQSCredentials) {
    return this.createProducer(region, credentials);
  }

  testCreateConsumer(region: string, credentials: AwsSQSCredentials) {
    const handleMessage: AwsSQSConsumerMessageHandler = (message) => Promise.resolve(message);

    return this.createConsumer(region, credentials, handleMessage);
  }
}

describe('AwsSQSConstructor', () => {
  const awsSQSConstructor = new AwsSQSTestConstructor('jest', AwsSQSConfig.of('https://jestjs.io', 'test-queue'), {
    pending: () => Promise.resolve(),
    sendOk: () => Promise.resolve(),
    sendFail: () => Promise.resolve(),
    consumeOk: () => Promise.resolve(),
    consumeFail: () => Promise.resolve(),
    processingOk: () => Promise.resolve(),
    processingFail: () => Promise.resolve(),
  });

  const awsConfigFActory = new AwsConfigFactory({
    AWS_REGION: 'region',
    AWS_ACCESS_KEY_ID: 'access',
    AWS_SECRET_ACCESS_KEY: 'secret',
  });

  it('contextName을 조회하면 jest:test-queue가 반환되어야 한다.', () => {
    expect(awsSQSConstructor.testContextName()).toEqual('jest:test-queue');
  });

  it('queueUrl을 조회하면 https://jestjs.io/test-queue가 출력되어야 한다.', () => {
    expect(awsSQSConstructor.testQueueUrl()).toEqual('https://jestjs.io/test-queue');
  });

  it('createConsumer 메소드로 producer를 생성할 수 있어야 한다.', () => {
    jest.spyOn(awsSQSConstructor, 'testCreateProducer').mockReturnValue(null);

    expect(awsSQSConstructor.testCreateProducer('region', awsConfigFActory)).toEqual(null);
  });

  it('createConsumer 메소드로 consumer를 생성할 수 있어야 한다.', () => {
    jest.spyOn(awsSQSConstructor, 'testCreateConsumer').mockReturnValue(null);

    expect(awsSQSConstructor.testCreateConsumer('region', awsConfigFActory)).toEqual(null);
  });
});
