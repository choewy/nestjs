import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { MongoDBConnectionName } from '@common/enums';
import { PaypalOrderLog, PaypalOrderLogSchema } from '@common/schemas';
import { HashModule } from '@core/hash';

import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';
import { PaypalOrderLogService } from './paypal-order.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: PaypalOrderLog.name, schema: PaypalOrderLogSchema }],
      MongoDBConnectionName.Logger,
    ),
    HttpModule,
    HashModule,
  ],
  controllers: [PaypalController],
  providers: [PaypalService, PaypalOrderLogService],
})
export class PaypalModule {}
