import { Module } from '@nestjs/common';

import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SystemListener } from './system.listener';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [SystemController],
  providers: [SystemListener, SystemService],
})
export class SystemModule {}
