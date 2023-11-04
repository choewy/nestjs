import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { PaypalConfig } from '@common/configs';
import { HashService } from '@core/hash';

import { CreatePaypalOrderBodyDto, CreatePaypalOrderRequestBodyDto, CreatePaypalOrderResponseDto } from './dto';
import { PaypalOrderLogService } from './paypal-order.service';
import { lastValueFrom } from 'rxjs';
import { AxiosHeaders } from 'axios';
import { FailGetPaypalOrderError } from './errors';
import { OrderResponseBody } from '@paypal/paypal-js';

@Injectable()
export class PaypalService {
  private readonly config = new PaypalConfig();

  constructor(
    private readonly paypalOrderLogService: PaypalOrderLogService,
    private readonly httpService: HttpService,
    private readonly hashService: HashService,
  ) {}

  async getPaypalOrderDetails(orderId: string) {
    const url = this.config.getPaypalApiUrl(`v2/checkout/orders/${orderId}`);

    const headers = new AxiosHeaders();

    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', this.config.getPaypalBasicAuthorization());

    const res = await lastValueFrom(this.httpService.get(url, { headers })).catch((e) => {
      throw new BadRequestException(new FailGetPaypalOrderError(e));
    });

    return res.data as OrderResponseBody;
  }

  async createPaypalOrder(body: CreatePaypalOrderBodyDto): Promise<CreatePaypalOrderResponseDto> {
    const orderLog = await this.paypalOrderLogService.createOrder(body);

    const hash = this.hashService.stringToBase64(orderLog.id);
    const order = new CreatePaypalOrderRequestBodyDto(
      hash,
      body.givenname,
      body.surname,
      body.email,
      body.itemname,
      body.amount,
    );

    return new CreatePaypalOrderResponseDto(hash, order);
  }

  async approvePaypalOrder() {
    return;
  }
}
