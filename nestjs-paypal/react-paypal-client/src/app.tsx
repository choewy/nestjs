import { FC, useState } from 'react';

import { CreatePaypalorderBody } from './common/types';

import { CreateOrderForm, PaypalOrderButton } from './components';

export const App: FC = () => {
  const [body, setBody] = useState<CreatePaypalorderBody>({
    surname: '',
    givenname: '',
    email: '',
    itemname: '',
    amount: 0,
  });

  return (
    <div>
      <CreateOrderForm body={body} setBody={setBody} />
      <PaypalOrderButton body={body} />
    </div>
  );
};
