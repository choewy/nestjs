import { Module } from '@nestjs/common';

import { NotificateGateway } from './notificate.gateway';

@Module({
  providers: [NotificateGateway],
})
export class NotificateModule {}
