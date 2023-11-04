import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  stringToBase64(source: string): string {
    return Buffer.from(source, 'utf8').toString('base64');
  }

  stringFromBase64(base64: string): string {
    return Buffer.from(base64, 'base64').toString('utf8');
  }
}
