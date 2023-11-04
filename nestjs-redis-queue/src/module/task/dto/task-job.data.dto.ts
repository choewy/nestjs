import { TaskQueueSubject } from '@common/enums';

export class TaskJobDataDto<D> {
  readonly id: string;

  constructor(readonly subject: TaskQueueSubject, readonly data: D) {
    this.id = [subject, Date.now()].join('_');
  }
}
