import { Job } from 'bull';

import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { QueueName } from '@common/enums';

import { AddTaskMessageJobBodyDto, AddTaskNotificateJobBodyDto, TaskJobDataDto } from './dto';

@Processor({ name: QueueName.Task })
export class TaskConsumer {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process()
  async onProcess(job: Job<TaskJobDataDto<AddTaskNotificateJobBodyDto | AddTaskMessageJobBodyDto>>) {
    try {
      await this.eventEmitter.emitAsync(job.data.subject, job.data.data);
      await job.moveToCompleted();
    } catch (e) {
      await job.moveToFailed(e);
    }
  }
}
