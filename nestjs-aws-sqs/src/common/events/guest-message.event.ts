import { AwsSQSSubject } from '@common/enums';

export class GuestMessageEvent {
  public static Subject = AwsSQSSubject.GuestMessage;

  constructor(readonly message: string, readonly date = new Date()) {}
}
