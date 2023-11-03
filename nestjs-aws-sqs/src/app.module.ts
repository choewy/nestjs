import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfig } from '@common/configs';
import { MongoDBConnectionName, MongoDBName } from '@common/enums';
import { AwsSQSModule } from '@core/aws-sqs';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HostModule } from '@module/host';
import { GuestModule } from '@module/guest';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MongooseModule.forRoot(...new MongoConfig().getModuleOptions(MongoDBName.Logs, MongoDBConnectionName.Logger)),
    AwsSQSModule,
    HostModule,
    GuestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
