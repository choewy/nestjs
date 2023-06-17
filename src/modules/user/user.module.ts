import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserListener } from './user.listener';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [UserController],
  providers: [UserListener, UserService],
})
export class UserModule {}
