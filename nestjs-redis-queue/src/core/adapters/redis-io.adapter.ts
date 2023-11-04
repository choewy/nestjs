import IoRedis from 'ioredis';
import { Server, ServerOptions } from 'socket.io';

import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';

import { RedisConfig } from '@common/configs';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const config = new RedisConfig();

    const pub = new IoRedis(config.getAdapterOptions());
    const sub = pub.duplicate();

    await Promise.all([pub.connect(), sub.connect()]);

    this.adapterConstructor = createAdapter(pub, sub);
  }

  createIOServer(port: number, options?: ServerOptions): Server {
    const server: Server = super.createIOServer(port, options);

    server.adapter(this.adapterConstructor);

    return server;
  }
}
