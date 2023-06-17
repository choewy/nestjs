import { Test, TestingModule } from '@nestjs/testing';
import { AwsSQSService } from './aws-sqs.service';

describe('AwsSQSService', () => {
  let awsSQSService: AwsSQSService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AwsSQSService],
    }).compile();

    awsSQSService = app.get(AwsSQSService);
  });

  it('AwsSQSService가 정의되어 있어야 한다.', () => {
    expect(awsSQSService).toBeDefined();
  });
});
