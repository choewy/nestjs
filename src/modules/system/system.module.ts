import { Module } from '@nestjs/common';

import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { SystemListener } from './system.listener';

@Module({
  controllers: [SystemController],
  providers: [SystemListener, SystemService],
})
export class SystemModule {}
