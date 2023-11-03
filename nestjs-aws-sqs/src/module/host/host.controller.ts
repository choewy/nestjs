import { Controller, Get, Param } from '@nestjs/common';

import { HostService } from './host.service';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('send/:message')
  async sendMessageToGuest(@Param('message') message: string): Promise<void> {
    return this.hostService.sendMessageToGuest(message);
  }
}
