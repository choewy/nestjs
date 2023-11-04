import { Body, Controller, Post } from '@nestjs/common';

import { CreatePaypalOrderBodyDto, CreatePaypalOrderResponseDto } from './dto';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('order')
  async createPaypalOrder(@Body() body: CreatePaypalOrderBodyDto): Promise<CreatePaypalOrderResponseDto> {
    return this.paypalService.createPaypalOrder(body);
  }
}
