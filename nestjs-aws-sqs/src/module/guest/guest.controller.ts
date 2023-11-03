import { Controller, Get, Param } from '@nestjs/common';

import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get('send/:message')
  async sendMessageToHost(@Param('message') message: string): Promise<void> {
    return this.guestService.sendMessageToHost(message);
  }
}
