import { Module } from '@nestjs/common';
import { SQSLogRepository } from './sqs-log.repository';
import { SQSLogService } from './sqs-log.service';

@Module({
  providers: [SQSLogRepository.provider, SQSLogService],
  exports: [SQSLogService],
})
export class SQSLogModule {}
