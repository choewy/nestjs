import { Controller, Post } from '@nestjs/common';

import { ControllerRouter } from '@/core';

import { SystemSQSProducerSubject } from './enums';
import { SystemSQSProducer } from './system.sqs-producer';

@Controller(ControllerRouter.SYSTEM)
export class SystemController {
  constructor(private readonly systemSQSProducer: SystemSQSProducer) {}

  @Post()
  async sendToUser() {
    return this.systemSQSProducer.userQueue.send(SystemSQSProducerSubject.WELCOME_TO_USER, {
      username: 'choewy',
      message: 'welcome, choewy.',
      createdAt: new Date(),
    });
  }
}
