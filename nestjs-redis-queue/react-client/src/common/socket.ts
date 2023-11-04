import { Manager, Socket } from 'socket.io-client';

import { WebsocketNamespace } from './enums';
import { ApiConfig } from './configs';

export class SocketClient extends Socket {
  constructor(namespace: WebsocketNamespace, auth?: Record<string, any>) {
    const config = new ApiConfig();

    super(
      new Manager(config.getWsBaseUrl(), {
        autoConnect: false,
        transports: ['websocket'],
      }),
      namespace,
    );

    this.auth = auth;
  }
}
