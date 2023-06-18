import { Controller, Post } from '@nestjs/common';

import { ControllerRouter } from '@/core';

import { UserSQSProducerSubject } from './enums';
import { UserSQSProducer } from './user.sqs-producer';

@Controller(ControllerRouter.USER)
export class UserController {
  constructor(private readonly userSQSProducer: UserSQSProducer) {}

  @Post()
  async sendToSystem() {
    return this.userSQSProducer.systemQueue.send(UserSQSProducerSubject.HELLO_TO_SYSTEM, {
      username: 'choewy',
      message: 'hello, system.',
      createdAt: new Date(),
    });
  }
}
