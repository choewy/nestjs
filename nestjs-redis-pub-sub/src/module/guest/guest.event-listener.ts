import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { GuestMessageEvent } from '@common/events';

@Injectable()
export class GuestEventListener {
  private readonly logger = new Logger(GuestEventListener.name);

  @OnEvent(GuestMessageEvent.Subject, { suppressErrors: false })
  onMessage(event: GuestMessageEvent) {
    this.logger.verbose(JSON.stringify(event, null, 2));
  }
}
