import { CreateOrderRequestBody, INTENT, OrderApplicationContext, Payer, PurchaseUnit } from '@paypal/paypal-js';

export class CreatePaypalOrderRequestBodyDto implements Omit<CreateOrderRequestBody, 'payer'> {
  intent: INTENT;
  application_context: OrderApplicationContext;
  purchase_units: PurchaseUnit[];
  payer: Partial<Payer>;

  constructor(
    hash: string,
    given_name: string,
    surname: string,
    email_address: string,
    itemName: string,
    amount: number,
  ) {
    this.intent = 'CAPTURE';
    this.application_context = {
      locale: 'ko-KR',
      brand_name: 'CHOEWY',
      user_action: 'PAY_NOW',
      shipping_preference: 'NO_SHIPPING',
    };

    this.payer = { name: { given_name, surname }, email_address };

    const currency_code = 'USD';
    const value = amount.toFixed(2);

    this.purchase_units = [
      {
        description: hash,
        items: [{ name: itemName, quantity: '1', unit_amount: { currency_code, value } }],
        amount: { currency_code, value, breakdown: { item_total: { currency_code, value } } },
      },
    ];
  }
}
