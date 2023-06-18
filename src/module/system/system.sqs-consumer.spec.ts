import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core';
import { SystemSQSConsumer } from './system.sqs-consumer';

describe('SystemSQSConsumer', () => {
  let systemSQSConsumer: SystemSQSConsumer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [SystemSQSConsumer],
    }).compile();

    systemSQSConsumer = module.get(SystemSQSConsumer);
  });

  it('SystemSQSConsumer가 정의되어 있어야 한다.', () => {
    expect(systemSQSConsumer).toBeDefined();
  });
});
