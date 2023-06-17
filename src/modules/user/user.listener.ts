import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class UserListener {
  private readonly logger = new Logger(UserListener.name);

  @OnEvent('welcome-user')
  async onWelcomeFromSystem(data: any) {
    this.logger.log(JSON.stringify(data, null, 2));
  }
}
