import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongoConfig } from '@common/configs';
import { MongoDBConnectionName } from '@common/enums';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PaypalModule } from '@module/paypal';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(...new MongoConfig().getModuleOptions(MongoDBConnectionName.Logger)),
    PaypalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
