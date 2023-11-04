import { Auth, Message, Notificate } from '../common/types';

export type StoreDefaultValue = {
  auth: Auth;
  notificates: Notificate[];
  messages: Message[];
};
