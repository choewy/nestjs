import { Queue } from 'bull';

import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';

import { QueueName } from '@common/enums';
import { TaskJobDataDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectQueue(QueueName.Task)
    private readonly taskQueue: Queue,
    @InjectQueue(QueueName.Notificate)
    private readonly notificateQueue: Queue,
    @InjectQueue(QueueName.Message)
    private readonly messageQueue: Queue,
  ) {}

  async addTaskJob<D>(data: TaskJobDataDto<D>) {
    await this.taskQueue.add(data);
  }

  async addNotificateJob<D>(data: TaskJobDataDto<D>) {
    await this.notificateQueue.add(data);
  }

  async addMessageJob<D>(data: TaskJobDataDto<D>) {
    await this.messageQueue.add(data);
  }
}
