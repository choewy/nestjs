import { SchemaTypes } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AwsSQSStatus } from '@common/enums';

@Schema({ collection: 'AwsSQSLog' })
export class AwsSQSLog {
  @Prop({ type: SchemaTypes.String, required: true })
  id: string;

  @Prop({ type: SchemaTypes.String, default: null })
  messageId: string;

  @Prop({ type: SchemaTypes.String, required: true })
  producerName: string;

  @Prop({ type: SchemaTypes.String, default: null })
  consumerName: string | null;

  @Prop({ type: SchemaTypes.String, default: null })
  subject: string | null;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  payload: object | null;

  @Prop({ type: SchemaTypes.String, required: true })
  status: AwsSQSStatus;

  @Prop({ type: SchemaTypes.Mixed, default: null })
  error: Error | null;

  @Prop({ type: SchemaTypes.Date, required: true })
  createdAt: Date | null;

  @Prop({ type: SchemaTypes.Date, default: null })
  producedAt: Date | null;

  @Prop({ type: SchemaTypes.Date, default: null })
  consumedAt: Date | null;

  @Prop({ type: SchemaTypes.Date, default: null })
  completedAt: Date | null;

  @Prop({ type: SchemaTypes.Date, default: null })
  failedAt: Date | null;
}

export const AwsSQSLogSchema = SchemaFactory.createForClass(AwsSQSLog);
