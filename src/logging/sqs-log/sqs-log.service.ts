import { Injectable } from '@nestjs/common';

import { SQSLog } from './sqs-log.entity';
import { SQSLogRepository } from './sqs-log.repository';
import { AwsSQSLogServiceImpl } from '@/core';

@Injectable()
export class SQSLogService implements AwsSQSLogServiceImpl {
  constructor(private readonly sqsLogRepository: SQSLogRepository) {}

  async pending(uuid: string, producer: string, subject: string, data: object) {
    await this.sqsLogRepository.insert(SQSLog.pendingOf(uuid, producer, subject, data));
  }

  async sendOk(uuid: string, messageId: string): Promise<void> {
    await this.sqsLogRepository.update({ uuid }, SQSLog.sendOkOf(messageId));
  }

  async sendFail(uuid: string, error: any): Promise<void> {
    await this.sqsLogRepository.update({ uuid }, SQSLog.sendFailOf(error));
  }

  async consumeOk(messageId: string, consumer: string): Promise<void> {
    await this.sqsLogRepository.update({ messageId }, SQSLog.consumeOkOf(consumer));
  }

  async consumeFail(messageId: string, consumer: string, error: any): Promise<void> {
    await this.sqsLogRepository.update({ messageId }, SQSLog.consumeFailOf(consumer, error));
  }

  async processingOk(messageId: string): Promise<void> {
    await this.sqsLogRepository.update({ messageId }, SQSLog.processingOkOf());
  }

  async processingFail(messageId: string, error: any): Promise<void> {
    await this.sqsLogRepository.update({ messageId }, SQSLog.processingFailOf(error));
  }
}
