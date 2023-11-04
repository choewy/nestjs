import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TaskQueueSubject } from '@common/enums';

import { AddTaskNotificateJobBodyDto } from '@module/task/dto';

@WebSocketGateway({
  namespace: 'notificate',
  transports: ['websocket'],
})
export class NotificateGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly nsp: Namespace;

  private getUserRoomName(userId: number): string {
    return ['notificate:user', userId].join('_');
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId = client.handshake.auth.userId;

    if (userId) {
      await client.join(this.getUserRoomName(userId));
    }
  }

  @OnEvent(TaskQueueSubject.Notificate, { suppressErrors: false })
  async onNotificate(payload: AddTaskNotificateJobBodyDto): Promise<void> {
    if (payload.userId) {
      this.nsp.in(this.getUserRoomName(payload.userId)).emit('notificate', payload);
    } else {
      this.nsp.emit('notificate', payload);
    }
  }
}
