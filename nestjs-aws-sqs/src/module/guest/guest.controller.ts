import { Controller, Get, Param } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { GuestMessageEvent } from '@common/events';

import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get('send/:message')
  async sendMessageToHost(@Param('message') message: string) {
    return this.guestService.sendMessageToHost(message);
  }

  @OnEvent(GuestMessageEvent.Subject, { suppressErrors: false })
  async onMessage(event: GuestMessageEvent) {
    console.log({ context: GuestController.name, event });
  }
}
