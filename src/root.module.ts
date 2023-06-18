import { Module } from '@nestjs/common';

import { CoreModule } from '@/core';
import { SystemModule, UserModule } from '@/module';

@Module({
  imports: [CoreModule, SystemModule, UserModule],
})
export class RootModule {}
