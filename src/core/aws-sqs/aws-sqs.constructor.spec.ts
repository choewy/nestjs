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
    AwsSQSTestConstructor.name,
    'region',
    { accessKeyId: 'access', secretAccessKey: 'secret' },
    'http://localhost:45661',
    'test-queue',
  );

  it('contextName을 조회하면 AwsSQSTestConstructor:test-queue가 반환되어야 한다.', () => {
    expect(awsSQSConstructor.testContextName()).toEqual('AwsSQSTestConstructor:test-queue');
  });

  it('queueUrl을 조회하면 http://localhost:45661/test-queue가 출력되어야 한다.', () => {
    expect(awsSQSConstructor.testQueueUrl()).toEqual('http://localhost:45661/test-queue');
  });
});
