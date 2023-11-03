import IoRedis from 'ioredis';

import { BeforeApplicationShutdown, Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { RedisService } from '@core/redis';
import { RedisPubSubChannel } from '@common/enums';

@Injectable()
export class HostService implements OnApplicationBootstrap, BeforeApplicationShutdown {
  private sub: IoRedis;

  constructor(private readonly redisService: RedisService) {}

  onApplicationBootstrap() {
    this.sub = this.redisService.createSubscriber(RedisPubSubChannel.Host);
  }

  beforeApplicationShutdown() {
    this.sub.disconnect();
  }
}
