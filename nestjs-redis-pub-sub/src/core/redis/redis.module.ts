import { Module, forwardRef } from '@nestjs/common';

import { RedisService } from './redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
export const RedisModuleRef = forwardRef(() => RedisModule);
