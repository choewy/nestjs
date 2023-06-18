import { Test, TestingModule } from '@nestjs/testing';
import { UserSQSConsumer } from './user.sqs-consumer';

import { CoreModule } from '@/core';

describe('UserSQSConsumer', () => {
  let userSQSConsumer: UserSQSConsumer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [UserSQSConsumer],
    }).compile();

    userSQSConsumer = module.get(UserSQSConsumer);
  });

  it('UserSQSConsumer가 정의되어 있어야 한다.', () => {
    expect(userSQSConsumer).toBeDefined();
  });
});
