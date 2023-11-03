export enum MongoDBName {
  Logs = 'logs',
}

export enum MongoDBConnectionName {
  Logger = 'logger',
}

export enum AwsSQSQueueName {
  Host = 'queue-local-1.fifo',
  Guest = 'queue-local-2.fifo',
}

export enum AwsSQSStatus {
  Created = 'created',
  Produced = 'produced',
  Consumed = 'consumed',
  Completed = 'completed',
  Error = 'error',
  Failed = 'failed',
}

export enum AwsSQSSubject {
  HostMessage = 'aws-sqs.host.message',
  GuestMessage = 'aws-sqs.guest.message',
}
