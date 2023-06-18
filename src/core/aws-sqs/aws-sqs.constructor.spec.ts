import { AwsSQSConstructor } from './aws-sqs.constructor';

class AwsSQSTestConstructor extends AwsSQSConstructor {
  testContextName(): string {
    return this.contextName;
  }

  testQueueUrl(): string {
    return this.queueUrl;
  }
}

describe('AwsSQSConstructor', () => {
  const awsSQSConstructor = new AwsSQSTestConstructor(
    'jest',
    'region',
    { accessKeyId: 'access', secretAccessKey: 'secret' },
    'https://jestjs.io',
    'test-queue',
  );

  it('contextName을 조회하면 jest:test-queue가 반환되어야 한다.', () => {
    expect(awsSQSConstructor.testContextName()).toEqual('jest:test-queue');
  });

  it('queueUrl을 조회하면 https://jestjs.io/test-queue가 출력되어야 한다.', () => {
    expect(awsSQSConstructor.testQueueUrl()).toEqual('https://jestjs.io/test-queue');
  });
});
