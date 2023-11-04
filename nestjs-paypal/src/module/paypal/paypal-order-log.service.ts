import { v4 } from 'uuid';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { MongoDBConnectionName, PaypalOrderStatus } from '@common/enums';
import { PaypalOrderLog } from '@common/schemas';
import { CreatePaypalOrderBodyDto } from './dto';

@Injectable()
export class PaypalOrderLogService {
  constructor(
    @InjectModel(PaypalOrderLog.name, MongoDBConnectionName.Logger)
    private readonly paypalOrderModel: Model<PaypalOrderLog>,
  ) {}

  async createOrder(body: CreatePaypalOrderBodyDto) {
    return new this.paypalOrderModel({
      id: ['PAYPAL', v4()].join('_'),
      userName: [body.surname, body.givenname].join(''),
      userEmail: body.email,
      itemName: body.itemname,
      itemAmount: body.amount,
      orderStatus: PaypalOrderStatus.Created,
      createdAt: new Date(),
    }).save();
  }
}
