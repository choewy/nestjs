import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfig } from '@common/configs';
import { MongoDBConnectionName, MongoDBName } from '@common/enums';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(...new MongoConfig().getModuleOptions(MongoDBName.Logs, MongoDBConnectionName.Logger)),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
