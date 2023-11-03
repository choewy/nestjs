import { Controller, Get, Param } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { HostMessageEvent } from '@common/events';

import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('send/:message')
  async sendMessageToGuest(@Param('message') message: string) {
    return this.hostService.sendMessageToGuest(message);
  }

  @OnEvent(HostMessageEvent.Subject, { suppressErrors: false })
  async onMessage(event: HostMessageEvent) {
    console.log({ context: HostController.name, event });
  }
}
