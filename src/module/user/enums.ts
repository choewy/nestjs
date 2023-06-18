export enum UserSQSConsumerName {
  USER_QUEUE = 'userQueue',
}

export enum UserSQSProducerName {
  SYSTEM_QUEUE = 'systemQueue',
}

export enum UserSQSConsumerSubject {
  WELCOME_FROM_SYSTEM = 'system:welcome',
}

export enum UserSQSProducerSubject {
  HELLO_TO_SYSTEM = 'user:hello',
}
