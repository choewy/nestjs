import { Controller, Post } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('sqs/user')
  async sendToSystem() {
    return this.systemService.sendToUser('welcome-user', {
      username: 'choewy',
      createdAt: new Date(),
    });
  }
}
