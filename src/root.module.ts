import { Module } from '@nestjs/common';

import { CoreModule } from '@/core';

import { SystemModule, UserModule } from './modules';

@Module({
  imports: [CoreModule, SystemModule, UserModule],
})
export class RootModule {}
