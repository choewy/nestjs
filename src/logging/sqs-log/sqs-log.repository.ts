import { Repository } from 'typeorm';

import { CustomRepository, CustomRepositoryProvider } from '@/core';

import { SQSLog } from './sqs-log.entity';
import { FactoryProvider } from '@nestjs/common';

@CustomRepository(SQSLog)
export class SQSLogRepository extends Repository<SQSLog> {
  private static $provider: FactoryProvider;

  public static get provider(): FactoryProvider {
    if (!this.$provider) {
      this.$provider = CustomRepositoryProvider(this);
    }

    return this.$provider;
  }
}
