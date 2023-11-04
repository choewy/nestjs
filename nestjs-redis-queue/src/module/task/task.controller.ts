import { Body, Controller, Post } from '@nestjs/common';

import { TaskQueueSubject } from '@common/enums';

import { AddTaskMessageJobBodyDto, AddTaskNotificateJobBodyDto, TaskJobDataDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('notificate')
  async addTaskNotificateJob(@Body() body: AddTaskNotificateJobBodyDto) {
    return this.taskService.addNotificateJob(new TaskJobDataDto(TaskQueueSubject.Notificate, body));
  }

  @Post('message')
  async addTaskMessageJob(@Body() body: AddTaskMessageJobBodyDto) {
    return this.taskService.addMessageJob(new TaskJobDataDto(TaskQueueSubject.Message, body));
  }
}
