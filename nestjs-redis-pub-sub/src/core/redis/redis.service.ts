import IoRedis from 'ioredis';

import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RedisConfig } from '@common/configs';
import { RedisPubSubMessage } from '@common/types';
import { RedisPubSubChannel } from '@common/enums';
import { RedisSubError } from './errors';

@Injectable()
export class RedisService extends IoRedis {
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {
    super(new RedisConfig().getConnectionOptions());
  }

  async publishToChannel<D>(channel: RedisPubSubChannel, payload: RedisPubSubMessage<D>): Promise<void> {
    await super.publish(channel, Buffer.from(JSON.stringify(payload), 'utf8').toString('base64'));
  }

  public createSubscriber(...channels: RedisPubSubChannel[]): IoRedis {
    const sub = this.duplicate({ lazyConnect: true });

    sub.on('message', (channel, message) => {
      let payload: RedisPubSubMessage<unknown>;

      try {
        payload = JSON.parse(Buffer.from(message, 'base64').toString('utf8'));
      } catch {
        payload = null;
      }

      if (payload === null) {
        return;
      }

      this.eventEmitter.emitAsync(payload.subject, payload.body).catch((error) => {
        this.logger.error(JSON.stringify({ channel, error: new RedisSubError(error) }, null, 2));
      });
    });

    sub.subscribe(...channels);

    return sub;
  }
}
