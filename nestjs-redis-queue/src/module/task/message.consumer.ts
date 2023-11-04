import { Job } from 'bull';

import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { QueueName } from '@common/enums';

import { AddTaskMessageJobBodyDto, AddTaskNotificateJobBodyDto, TaskJobDataDto } from './dto';

@Processor({ name: QueueName.Message })
export class MessageConsumer {
  private readonly logger = new Logger(MessageConsumer.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process()
  async onProcess(job: Job<TaskJobDataDto<AddTaskNotificateJobBodyDto | AddTaskMessageJobBodyDto>>) {
    this.logger.debug(
      JSON.stringify(
        {
          message: 'consume',
          name: QueueName.Message,
          subject: job.data.subject,
          data: job.data.data,
        },
        null,
        2,
      ),
    );

    try {
      await this.eventEmitter.emitAsync(job.data.subject, job.data.data);
      await job.moveToCompleted();
    } catch (e) {
      await job.moveToFailed(e);
    }
  }
}
