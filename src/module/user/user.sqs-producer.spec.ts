import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { SQSLogService } from '@/logging';
import { ConfigModule } from '@/core';

import { UserSQSProducer } from './user.sqs-producer';

describe('UserSQSProducer', () => {
  let userSQSProducer: UserSQSProducer;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, EventEmitterModule.forRoot()],
      providers: [
        UserSQSProducer,
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

    userSQSProducer = module.get(UserSQSProducer);
  });

  it('UserSQSProducer가 정의되어 있어야 한다.', () => {
    expect(userSQSProducer).toBeDefined();
  });
});
