import { AwsSQSSubject } from '@common/enums';

export class HostMessageEvent {
  public static Subject = AwsSQSSubject.HostMessage;

  constructor(readonly message: string, readonly date = new Date()) {}
}
