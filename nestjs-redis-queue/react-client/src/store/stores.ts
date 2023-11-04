import { atom } from 'recoil';

import { StoreDefaultValue } from './types';

export const leftStore = atom<StoreDefaultValue>({
  key: 'leftstore',
  default: {
    auth: {
      userId: 1,
      chatId: 'chat-room-1',
    },
    notificates: [],
    messages: [],
  },
});

export const rightStore = atom<StoreDefaultValue>({
  key: 'rightstore',
  default: {
    auth: {
      userId: 2,
      chatId: 'chat-room-1',
    },
    notificates: [],
    messages: [],
  },
});
