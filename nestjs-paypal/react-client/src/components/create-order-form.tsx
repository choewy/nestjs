import { FC, Dispatch, SetStateAction } from 'react';

import { CreatePaypalorderBody } from '../common/types';
import { InputHandler } from '../common/handlers';

export const CreateOrderForm: FC<{
  body: CreatePaypalorderBody;
  setBody: Dispatch<SetStateAction<CreatePaypalorderBody>>;
}> = ({ body, setBody }) => {
  const inputHandler = new InputHandler(setBody);

  return (
    <div>
      <div>
        <label style={{ display: 'block', fontSize: 13 }}>이름(성)</label>
        <input name="surname" value={body.surname} onChange={inputHandler.text} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>이름(명)</label>
        <input name="givenname" value={body.givenname} onChange={inputHandler.text} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>이메일</label>
        <input name="email" value={body.email} onChange={inputHandler.text} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>결제상품명</label>
        <input name="itemname" value={body.itemname} onChange={inputHandler.text} />
      </div>

      <div>
        <label style={{ display: 'block', fontSize: 13 }}>결제금액(USD)</label>
        <input name="amount" value={body.amount} onChange={inputHandler.number} />
      </div>
    </div>
  );
};
