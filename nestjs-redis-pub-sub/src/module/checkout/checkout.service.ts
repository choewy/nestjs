import { BadRequestException, Injectable } from '@nestjs/common';

import { RedisPubSubChannel } from '@common/enums';
import { GuestMessageEvent, HostMessageEvent } from '@common/events';
import { RedisService } from '@core/redis';

@Injectable()
export class CheckoutService {
  constructor(private readonly redisService: RedisService) {}

  async sendMessageToHost(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    await this.redisService.publishToChannel(
      RedisPubSubChannel.Host,
      new HostMessageEvent({ message, date: new Date() }),
    );
  }

  async sendMessageToGuest(message?: string): Promise<void> {
    if (!message) {
      throw new BadRequestException();
    }

    await this.redisService.publishToChannel(
      RedisPubSubChannel.Guest,
      new GuestMessageEvent({ message, date: new Date() }),
    );
  }
}
