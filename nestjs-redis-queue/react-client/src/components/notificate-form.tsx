import { FC, FormEvent, useCallback, useState } from 'react';

import { Notificate } from '../common/types';
import { InputHandler } from '../common/handlers';
import { taskApi } from '../common/apis';

export const NotificateForm: FC = () => {
  const [body, setBody] = useState<Notificate>({
    userId: null,
    title: '',
    contents: '',
  });

  const inputHandler = new InputHandler(setBody);

  const send = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await taskApi.sendNotificate(body);
    },
    [body],
  );

  return (
    <div>
      <h3>알림 보내기</h3>
      <form onSubmit={send}>
        <div>
          <label style={{ display: 'block', fontSize: 13 }}>User ID</label>
          <input name="userId" value={body.userId ?? ''} onChange={inputHandler.int} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13 }}>제목</label>
          <input name="title" value={body.title} onChange={inputHandler.string} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: 13 }}>내용</label>
          <input name="contents" value={body.contents} onChange={inputHandler.string} />
        </div>

        <div>
          <button type="submit">보내기</button>
        </div>
      </form>
    </div>
  );
};
