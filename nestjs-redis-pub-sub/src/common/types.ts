export type RedisPubSubMessage<D> = {
  subject: string;
  body: D;
};
