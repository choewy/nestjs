import { ConfigService } from '@nestjs/config';

export class PaypalConfig {
  private readonly configService = new ConfigService();

  private readonly PAYPAL_API_URL = this.configService.get<string>('PAYPAL_API_URL');
  private readonly PAYPAL_CLIENT_ID = this.configService.get<string>('PAYPAL_CLIENT_ID');
  private readonly PAYPAL_CLIENT_SECRET = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

  public getPaypalApiUrl(): string {
    return this.PAYPAL_API_URL;
  }

  public getPaypalClientId(): string {
    return this.PAYPAL_CLIENT_ID;
  }

  public getPaypalClientSecret(): string {
    return this.PAYPAL_CLIENT_SECRET;
  }
}
