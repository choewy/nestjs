import { RedisPubSubMessage } from '@common/types';
import { HostRedisSubSubject } from '@common/enums';

export class HostMessageEvent<D = { message: string; date: Date }> implements RedisPubSubMessage<D> {
  public static Subject = HostRedisSubSubject.Message;

  public readonly subject: HostRedisSubSubject.Message;
  public readonly body: D;

  constructor(body: D) {
    this.subject = HostRedisSubSubject.Message;
    this.body = body;
  }
}
