import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { QueueConfigKey, QueueName } from '@common/enums';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskConsumer } from './task.consumer';
import { NotificateConsumer } from './notificate.consumer';
import { MessageConsumer } from './message.consumer';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        configKey: QueueConfigKey.Queue,
        name: QueueName.Task,
      },
      {
        configKey: QueueConfigKey.Queue,
        name: QueueName.Message,
      },
      {
        configKey: QueueConfigKey.Queue,
        name: QueueName.Notificate,
      },
    ),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskConsumer, NotificateConsumer, MessageConsumer],
})
export class TaskModule {}
