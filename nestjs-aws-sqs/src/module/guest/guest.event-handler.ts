import { Injectable, Logger } from '@nestjs/common';

import { GuestMessageEvent } from '@common/events';

@Injectable()
export class GuestEventHandler {
  private readonly logger = new Logger(GuestEventHandler.name);

  public handleMessage(event: GuestMessageEvent): void {
    this.logger.verbose(JSON.stringify(event, null, 2));
  }
}
