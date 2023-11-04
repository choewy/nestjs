import { Job } from 'bull';

import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { QueueName } from '@common/enums';

import { AddTaskMessageJobBodyDto, AddTaskNotificateJobBodyDto, TaskJobDataDto } from './dto';

@Processor({ name: QueueName.Notificate })
export class NotificateConsumer {
  private readonly logger = new Logger(NotificateConsumer.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Process()
  async onProcess(job: Job<TaskJobDataDto<AddTaskNotificateJobBodyDto | AddTaskMessageJobBodyDto>>) {
    this.logger.debug(
      JSON.stringify(
        {
          message: 'consume',
          name: QueueName.Notificate,
          subject: job.data.subject,
          data: job.data.data,
        },
        null,
        2,
      ),
    );

    try {
      await this.eventEmitter.emitAsync(job.data.subject, job.data.data);
    } catch (e) {
      await job.moveToFailed(e);
    }
  }
}
