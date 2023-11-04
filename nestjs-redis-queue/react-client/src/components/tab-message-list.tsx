import { FC } from 'react';

import { useRecoilValue } from 'recoil';

import { TabProps } from './types';
import { TabMessageForm } from './tab-message-form';

export const TabMessageList: FC<TabProps> = ({ store }) => {
  const { auth, messages } = useRecoilValue(store);

  return (
    <div style={{ width: '100%' }}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th align="center" style={{ width: 50 }}>
              보낸이
            </th>
            <th align="center" style={{ width: 50 }}>
              받는이
            </th>
            <th align="center">내용</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, i) => (
            <tr key={[JSON.stringify(message), i].join('_')}>
              <td align="center">{message.senderId}</td>
              <td align="center">{message.receiverId ?? message.chatId}</td>
              <td align="center">{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TabMessageForm senderId={auth.userId} />
    </div>
  );
};
