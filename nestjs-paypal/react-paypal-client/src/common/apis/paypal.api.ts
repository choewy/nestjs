import { ApprovePaypalOrderBody, CreatePaypalorderBody } from '../types';

import { BaseApi } from './base.api';

export class PaypalApi extends BaseApi {
  async getPaypalClientId() {
    return this.api.get(this.getUrl('sdk'));
  }

  async createPaypalOrderData(body: CreatePaypalorderBody) {
    return this.api.post(this.getUrl('order'), body);
  }

  async approvePaypalOrder(body: ApprovePaypalOrderBody) {
    return this.api.post(this.getUrl('approve'), body);
  }

  async reportPaypalOrderError(body: Record<string, unknown>) {
    return this.api.post(this.getUrl('error'), body);
  }
}

export const paypalApi = new PaypalApi('paypal');
