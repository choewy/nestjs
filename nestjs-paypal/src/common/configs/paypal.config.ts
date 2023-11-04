import { ConfigService } from '@nestjs/config';

export class PaypalConfig {
  private readonly configService = new ConfigService();

  private readonly PAYPAL_API_URL = this.configService.get<string>('PAYPAL_API_URL');
  private readonly PAYPAL_CLIENT_ID = this.configService.get<string>('PAYPAL_CLIENT_ID');
  private readonly PAYPAL_CLIENT_SECRET = this.configService.get<string>('PAYPAL_CLIENT_SECRET');

  public getPaypalApiUrl(path?: string): string {
    let url = this.PAYPAL_API_URL;

    if (path) {
      if (path.startsWith('/')) {
        url += path;
      } else {
        url += `/${path}`;
      }
    }

    return url;
  }

  public getPaypalBasicAuthorization(): string {
    return [
      'Basic',
      Buffer.from([this.PAYPAL_CLIENT_ID, this.PAYPAL_CLIENT_SECRET].join(':'), 'utf8').toString('base64'),
    ].join(' ');
  }

  public getPaypalClientId(): string {
    return this.PAYPAL_CLIENT_ID;
  }

  public getPaypalClientSecret(): string {
    return this.PAYPAL_CLIENT_SECRET;
  }
}
