import { API } from './types';

import { postRequest } from '.';

export const orders = {
  onramp: {
    create: (data: API.Orders.OnRamp.Request) => postRequest<API.Orders.OnRamp.Response>('/orders/onramp', { data }),
  },
  offramp: {
    create: (data: API.Orders.OffRamp.Request) => postRequest<API.Orders.OffRamp.Response>('/orders/offramp', { data }),
  },
  crypto: {
    withdrawal: {
      create: (data: API.Orders.Crypto.Withdrawal.Request) =>
        postRequest<API.Orders.Crypto.Withdrawal.Response>('/orders/crypto/withdrawal', { data }),
    },
  },
};
