import { AwsSQSStatus } from '@common/enums';
import { AwsSQSLog } from '@common/schemas';

export class AwsSQSLogResponseDto {
  readonly id: string;
  readonly messageId: string;
  readonly producerName: string;
  readonly consumerName: string;
  readonly subject: string;
  readonly payload: object;
  readonly status: AwsSQSStatus;

  constructor(row: AwsSQSLog) {
    this.id = row.id;
    this.messageId = row.messageId;
    this.producerName = row.producerName;
    this.consumerName = row.consumerName;
    this.subject = row.subject;
    this.payload = row.payload;
    this.status = row.status;
  }
}
