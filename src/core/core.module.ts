import { Module } from '@nestjs/common';
import { ConfigModule } from './config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [ConfigModule, EventEmitterModule.forRoot()],
  exports: [ConfigModule],
})
export class CoreModule {}
