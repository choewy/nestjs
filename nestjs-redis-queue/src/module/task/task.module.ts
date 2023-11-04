import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { QueueConfigKey, QueueName } from '@common/enums';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskConsumer } from './task.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      configKey: QueueConfigKey.Queue,
      name: QueueName.Task,
    }),
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskConsumer],
})
export class TaskModule {}
