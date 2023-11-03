import { Injectable, Logger } from '@nestjs/common';

import { HostMessageEvent } from '@common/events';

@Injectable()
export class HostEventHandler {
  private readonly logger = new Logger(HostEventHandler.name);

  public handleMessage(event: HostMessageEvent): void {
    this.logger.verbose(JSON.stringify(event, null, 2));
  }
}
