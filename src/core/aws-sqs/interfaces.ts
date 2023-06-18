import { Message } from '@aws-sdk/client-sqs';

export interface AwsSQSConsumerMessageHandler {
  (message: Message): Promise<void | Message>;
}
