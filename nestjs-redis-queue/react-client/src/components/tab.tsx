import { FC, ReactElement, useEffect, useMemo, useState } from 'react';

import { TabProps } from './types';
import { TabNotificateList } from './tab-notificate-list';
import { TabMessageList } from './tab-message-list';
import { useRecoilState } from 'recoil';
import { SocketClient } from '../common/socket';
import { WebsocketNamespace } from '../common/enums';
import { Message, Notificate } from '../common/types';

export const Tab: FC<TabProps> = ({ store }) => {
  const [storeValue, setStoreValue] = useRecoilState(store);

  const notificateSocket = useMemo(
    () => new SocketClient(WebsocketNamespace.Notificate, storeValue.auth),
    [storeValue.auth],
  );

  useEffect(() => {
    if (notificateSocket.connected) {
      return;
    }

    notificateSocket.on('notificate', (notificate: Notificate) => {
      setStoreValue((prev) => ({ ...prev, notificates: [notificate, ...prev.notificates] }));
    });

    notificateSocket.connect();
  }, [notificateSocket, setStoreValue]);

  const messageSocket = useMemo(() => new SocketClient(WebsocketNamespace.Message, storeValue.auth), [storeValue.auth]);

  useEffect(() => {
    if (messageSocket.connected) {
      return;
    }

    messageSocket.on('message', (message: Message) => {
      setStoreValue((prev) => ({ ...prev, messages: [message, ...prev.messages] }));
    });

    messageSocket.connect();
  }, [messageSocket, setStoreValue]);

  const [tabIndex, setTabIndex] = useState<number>(0);

  let element: ReactElement;

  switch (tabIndex) {
    case 0:
      element = <TabNotificateList store={store} />;
      break;

    case 1:
      element = <TabMessageList store={store} />;
      break;

    default:
      element = <></>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ul>
        <li>User ID : {storeValue.auth.userId}</li>
        <li>Chat ID : {storeValue.auth.chatId}</li>
      </ul>

      <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
        {['알림', '메시지'].map((label, index) => (
          <div
            key={[store.key, label, index].join('-')}
            onClick={() => setTabIndex(index)}
            style={{ cursor: 'pointer', borderBottom: index === tabIndex ? '1px solid blue' : undefined }}
          >
            {label}
          </div>
        ))}
      </div>
      {element}
    </div>
  );
};
