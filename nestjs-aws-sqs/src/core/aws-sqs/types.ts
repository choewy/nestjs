import { Message } from '@aws-sdk/client-sqs';

export type AwsSQSMessageBody<D> = {
  subject: string;
  payload: D;
};

export type AwsSQSConsumerMessageHandler = (message: Message) => Promise<void | Message>;
export type AwsSQSConsumerErrorHandler = (error: Error, messages?: Message | Message[]) => void;
