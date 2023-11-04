import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreatePaypalOrderBodyDto, CreatePaypalOrderResponseDto, ApprovePaypalOrderBodyDto } from './dto';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Get('sdk')
  async getPaypalClientIdForInitSDK(): Promise<string> {
    return this.paypalService.getPaypalClientIdForInitSDK();
  }

  @Post('order')
  async createPaypalOrder(@Body() body: CreatePaypalOrderBodyDto): Promise<CreatePaypalOrderResponseDto> {
    return this.paypalService.createPaypalOrder(body);
  }

  @Post('approve')
  async approvePaypalOrder(@Body() body: ApprovePaypalOrderBodyDto): Promise<void> {
    return this.paypalService.approvePaypalOrder(body);
  }
}
