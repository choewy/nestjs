import { FC, FormEvent, useCallback, useState } from 'react';

import { Message } from '../common/types';
import { InputHandler } from '../common/handlers';
import { taskApi } from '../common/apis';

export const TabMessageForm: FC<{ senderId: number }> = ({ senderId }) => {
  const [body, setBody] = useState<Omit<Message, 'createdAt'>>({
    senderId,
    receiverId: null,
    chatId: null,
    message: '',
  });

  const inputHandler = new InputHandler(setBody);

  const send = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await taskApi.sendMessage(body);
    },
    [body],
  );

  return (
    <form onSubmit={send}>
      <div>
        <label style={{ display: 'block', fontSize: 13 }}>User ID</label>
        <input name="receiverId" value={body.receiverId || ''} onChange={inputHandler.int} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>Chat ID</label>
        <input name="chatId" value={body.chatId || ''} onChange={inputHandler.string} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>내용</label>
        <input name="message" value={body.message} onChange={inputHandler.string} />
      </div>

      <button type="submit">보내기</button>
    </form>
  );
};
