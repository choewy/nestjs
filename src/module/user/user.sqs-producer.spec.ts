import { Test, TestingModule } from '@nestjs/testing';

import { CoreModule } from '@/core';
import { UserSQSProducer } from './user.sqs-producer';

describe('UserSQSProducer', () => {
  let userSQSProducer: UserSQSProducer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [UserSQSProducer],
    }).compile();

    userSQSProducer = module.get(UserSQSProducer);
  });

  it('UserSQSProducer가 정의되어 있어야 한다.', () => {
    expect(userSQSProducer).toBeDefined();
  });
});
