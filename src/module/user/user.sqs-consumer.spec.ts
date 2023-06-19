import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfigModule } from '@/core';
import { SQSLogService } from '@/logging';

import { UserSQSConsumer } from './user.sqs-consumer';

describe('UserSQSConsumer', () => {
  let userSQSConsumer: UserSQSConsumer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, EventEmitterModule.forRoot()],
      providers: [
        UserSQSConsumer,
        {
          provide: SQSLogService,
          useValue: () => ({
            pending: async () => Promise.resolve(),
            sendOk: async () => Promise.resolve(),
            sendFail: async () => Promise.resolve(),
            consumeOk: async () => Promise.resolve(),
            consumeFail: async () => Promise.resolve(),
            processingOk: async () => Promise.resolve(),
            processingFail: async () => Promise.resolve(),
          }),
        },
      ],
    }).compile();

    userSQSConsumer = module.get(UserSQSConsumer);
  });

  it('UserSQSConsumer가 정의되어 있어야 한다.', () => {
    expect(userSQSConsumer).toBeDefined();
  });
});
