import { Namespace, Socket } from 'socket.io';

import { OnGatewayConnection, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';

import { TaskQueueSubject } from '@common/enums';
import { AddTaskMessageJobBodyDto } from '@module/task/dto';

@WebSocketGateway({
  namespace: 'message',
  transports: ['websocket'],
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  private readonly nsp: Namespace;

  private getChatRoomName(chatId: string): string {
    return ['message:chat', chatId].join('_');
  }

  private getUserRoomName(userId: number): string {
    return ['message:user', userId].join('_');
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId;

    if (userId) {
      await client.join(this.getUserRoomName(userId));
    }

    const chatId = client.handshake.auth.chatId;

    if (chatId) {
      await client.join(this.getChatRoomName(chatId));
    }
  }

  @OnEvent(TaskQueueSubject.Message, { suppressErrors: false })
  async onMessage(payload: AddTaskMessageJobBodyDto): Promise<void> {
    if (payload.receiverId) {
      this.nsp.in(this.getUserRoomName(payload.receiverId)).emit('message', payload);
    }

    if (payload.chatId) {
      this.nsp.in(this.getChatRoomName(payload.chatId)).emit('message', payload);
    }
  }
}
