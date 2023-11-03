import { v4 } from 'uuid';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { AwsSQSStatus, MongoDBConnectionName } from '@common/enums';
import { AwsSQSLog } from '@common/schemas';

@Injectable()
export class AwsSQSLogService {
  constructor(
    @InjectModel(AwsSQSLog.name, MongoDBConnectionName.Logger)
    private readonly awsSQSLogModel: Model<AwsSQSLog>,
  ) {}

  async init<T>(producerName: string, subject: string, payload: T) {
    return new this.awsSQSLogModel({
      id: [Date.now(), v4()].join('_'),
      producerName,
      subject,
      payload,
      status: AwsSQSStatus.Created,
      createdAt: new Date(),
    }).save();
  }

  async updateAfterProduce(id: string, messageId: string): Promise<void> {
    await this.awsSQSLogModel
      .updateOne(
        { id },
        {
          messageId,
          status: AwsSQSStatus.Produced,
          producedAt: new Date(),
        },
      )
      .exec();
  }

  async updateAfterConsume(messageId: string, consumerName: string) {
    await this.awsSQSLogModel
      .updateOne(
        { messageId },
        {
          consumerName,
          status: AwsSQSStatus.Consumed,
          consumedAt: new Date(),
        },
      )
      .exec();
  }

  async updateAfterComplete(messageId: string) {
    await this.awsSQSLogModel
      .updateOne(
        { messageId },
        {
          status: AwsSQSStatus.Completed,
          completedAt: new Date(),
        },
      )
      .exec();
  }

  async updateAfterFail(messageId: string, error: Error): Promise<void> {
    await this.awsSQSLogModel
      .updateOne(
        { messageId },
        {
          error,
          status: AwsSQSStatus.Failed,
          failedAt: new Date(),
        },
      )
      .exec();
  }

  async updateAfterError(
    messageId: string,
    error: Error,
    options: Partial<Pick<AwsSQSLog, 'producerName' | 'consumerName'>> = {},
  ): Promise<void> {
    await this.awsSQSLogModel
      .updateOne(
        { messageId },
        {
          ...options,
          error,
          status: AwsSQSStatus.Error,
          failedAt: new Date(),
        },
      )
      .exec();
  }
}
