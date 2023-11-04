import { SchemaTypes } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaypalOrderStatus } from '@common/enums';

@Schema({ collection: 'PaypalOrderLog' })
export class PaypalOrderLog {
  @Prop({ required: true })
  id: string;

  @Prop({ default: null })
  orderId: string | null;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  userEmail: string;

  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  itemAmount: number;

  @Prop({ type: SchemaTypes.Mixed })
  orderDetails: object;

  @Prop({ type: SchemaTypes.String, required: true })
  orderStatus: PaypalOrderStatus;

  @Prop({ type: SchemaTypes.Date, required: true })
  createdAt: Date;

  @Prop({ type: SchemaTypes.Date, default: null })
  approvedAt: Date | null;

  @Prop({ type: SchemaTypes.Date, default: null })
  completedAt: Date | null;
}

export const PaypalOrderLogSchema = SchemaFactory.createForClass(PaypalOrderLog);
