import { CreatePaypalOrderRequestBodyDto } from './create-paypal-order-request.body.dto';

export class CreatePaypalOrderResponseDto {
  constructor(readonly clientId: string, readonly hash: string, readonly order: CreatePaypalOrderRequestBodyDto) {}
}
