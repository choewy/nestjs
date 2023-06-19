import { Message } from '@aws-sdk/client-sqs';

export interface AwsSQSConsumerMessageHandler {
  (message: Message): Promise<void | Message>;
}

export interface AwsSQSLogServiceImpl {
  pending(uuid: string, producer: string, subject: string, data: object): Promise<void>;
  sendOk(uuid: string, messageId: string): Promise<void>;
  sendFail(uuid: string, error: any): Promise<void>;
  consumeOk(messageId: string, consumer: string): Promise<void>;
  consumeFail(messageId: string, consumer: string, error: any): Promise<void>;
  processingOk(messageId: string): Promise<void>;
  processingFail(messageId: string, error: any): Promise<void>;
}
