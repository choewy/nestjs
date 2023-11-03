import { Controller, Get, Param } from '@nestjs/common';

import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Get('host/:message')
  async sendMessageToHost(@Param('message') message: string) {
    return this.checkoutService.sendMessageToHost(message);
  }

  @Get('guest/:message')
  async sendMessageToGuest(@Param('message') message: string) {
    return this.checkoutService.sendMessageToGuest(message);
  }
}
