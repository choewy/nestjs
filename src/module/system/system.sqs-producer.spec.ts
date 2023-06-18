import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core';
import { SystemSQSProducer } from './system.sqs-producer';

describe('SystemSQSProducer', () => {
  let systemSQSProducer: SystemSQSProducer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [SystemSQSProducer],
    }).compile();

    systemSQSProducer = module.get(SystemSQSProducer);
  });

  it('SystemSQSProducer가 정의되어 있어야 한다.', () => {
    expect(systemSQSProducer).toBeDefined();
  });
});
