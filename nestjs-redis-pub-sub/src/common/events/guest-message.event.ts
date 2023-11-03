import { RedisPubSubMessage } from '@common/types';
import { GuestRedisSubSubject } from '@common/enums';

export class GuestMessageEvent<D = { message: string; date: Date }> implements RedisPubSubMessage<D> {
  public static Subject = GuestRedisSubSubject.Message;

  public readonly subject: GuestRedisSubSubject.Message;
  public readonly body: D;

  constructor(body: D) {
    this.subject = GuestRedisSubSubject.Message;
    this.body = body;
  }
}
