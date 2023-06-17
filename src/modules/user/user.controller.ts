import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sqs/system')
  async sendToSystem() {
    return this.userService.sendToSystem('hello-system', {
      username: 'choewy',
      createdAt: new Date(),
    });
  }
}
