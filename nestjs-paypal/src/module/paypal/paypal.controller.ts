import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreatePaypalOrderBodyDto, CreatePaypalOrderResponseDto } from './dto';
import { PaypalService } from './paypal.service';
import { ApprovePaypalOrderBody } from 'react-paypal-client/src/common/types';

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
  async approvePaypalOrder(@Body() body: ApprovePaypalOrderBody): Promise<void> {
    return this.paypalService.approvePaypalOrder(body);
  }
}
