import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { QueueConfigKey } from '@common/enums';
import { RedisConfig } from '@common/configs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TaskModule } from '@module/task';
import { NotificateModule } from '@module/notificate';
import { MessageModule } from '@module/message';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot(QueueConfigKey.Queue, new RedisConfig().getBullModuleOptions()),
    EventEmitterModule.forRoot(),
    TaskModule,
    NotificateModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
