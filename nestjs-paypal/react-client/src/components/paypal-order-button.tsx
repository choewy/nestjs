import { FC, useCallback, useEffect, useState } from 'react';

import {
  CreateOrderActions,
  CreateOrderData,
  CreateOrderRequestBody,
  OnApproveActions,
  OnApproveData,
} from '@paypal/paypal-js';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import { paypalApi } from '../common/apis';
import { CreatePaypalorderBody } from '../common/types';

export const PaypalOrderButton: FC<{ body: CreatePaypalorderBody }> = ({ body }) => {
  const [clientId, setClientId] = useState<string>('');

  const disabled = !body.surname || !body.givenname || !body.email || !body.itemname || body.amount <= 0;

  useEffect(() => {
    if (clientId) {
      return;
    }

    paypalApi.getPaypalClientId().then((res) => {
      setClientId(res.data);
    });
  }, [clientId, setClientId]);

  const createOrder = useCallback(
    async (_: CreateOrderData, action: CreateOrderActions) => {
      let order: CreateOrderRequestBody = null;

      try {
        const res = await paypalApi.createPaypalOrderData(body);

        order = res.data.order;
      } catch (e) {
        console.log(e);
      }

      if (order === null) {
        return;
      }

      return action.order.create(order);
    },
    [body],
  );

  const onApprove = useCallback(async (_: OnApproveData, actions: OnApproveActions) => {
    let orderId = '';

    if (actions.order) {
      orderId = (await actions.order.capture()).id;
    }

    await paypalApi.approvePaypalOrder({ orderId });
  }, []);

  const onError = useCallback(async (e: Record<string, unknown>) => {
    await paypalApi.reportPaypalOrderError(e);
  }, []);

  if (clientId === '') {
    return <></>;
  }

  return (
    <PayPalScriptProvider options={{ clientId }}>
      <PayPalButtons
        disabled={disabled}
        forceReRender={[body, disabled]}
        fundingSource="paypal"
        style={{ color: 'white', layout: 'vertical' }}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};
