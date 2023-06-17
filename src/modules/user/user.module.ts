import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserListener } from './user.listener';

@Module({
  controllers: [UserController],
  providers: [UserListener, UserService],
})
export class UserModule {}
