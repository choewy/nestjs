import { FC, useState } from 'react';

import { CreatePaypalorderBody } from './common/types';

import { CreateOrderForm, PaypalOrderButton } from './components';

export const App: FC = () => {
  const [body, setBody] = useState<CreatePaypalorderBody>({
    surname: 'choe',
    givenname: 'wy',
    email: 'test123@gmail.com',
    itemname: 'test',
    amount: 10,
  });

  return (
    <div>
      <CreateOrderForm body={body} setBody={setBody} />
      <PaypalOrderButton body={body} />
    </div>
  );
};
