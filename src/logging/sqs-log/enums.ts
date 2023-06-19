export enum SQSLogStatus {
  PENDING = 'pending',
  SEND_OK = 'send-ok',
  SEND_FAIL = 'send-fail',
  CONSUME_OK = 'consume-ok',
  CONSUME_FAIL = 'consume-fail',
  PROCESSING_OK = 'processing-ok',
  PROCESSING_FAIL = 'processing-fail',
}
