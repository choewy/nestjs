import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class SystemListener {
  private readonly logger = new Logger(SystemListener.name);

  @OnEvent('hello-system')
  async onHelloFromUser(data: any) {
    this.logger.log(JSON.stringify(data, null, 2));
  }
}
