import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoDBConnectionName } from '@common/enums';
import { AwsSQSLog, AwsSQSLogSchema } from '@common/schemas';

import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: AwsSQSLog.name, schema: AwsSQSLogSchema }], MongoDBConnectionName.App)],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
