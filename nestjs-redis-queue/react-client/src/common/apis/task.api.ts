import { Message, Notificate } from '../types';

import { BaseApi } from './base.api';

export class TaskApi extends BaseApi {
  async sendNotificate(body: Notificate) {
    return this.api.post('task/notificate', body);
  }

  async sendMessage(body: Omit<Message, 'createdAt'>) {
    return this.api.post('task/message', body);
  }
}

export const taskApi = new TaskApi();
