import { Module } from '@nestjs/common';

import { CoreModule } from '@/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SystemModule, UserModule } from './modules';

@Module({
  imports: [CoreModule, SystemModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
