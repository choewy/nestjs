import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { HostMessageEvent } from '@common/events';

@Injectable()
export class HostEventListener {
  private readonly logger = new Logger(HostEventListener.name);

  @OnEvent(HostMessageEvent.Subject, { suppressErrors: false })
  onMessage(event: HostMessageEvent) {
    this.logger.verbose(JSON.stringify(event, null, 2));
  }
}
