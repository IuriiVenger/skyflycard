import { API } from './types';

import { postRequest } from '.';

export const orders = {
  onramp: (data: API.Orders.OnRamp.Request) => postRequest<API.Orders.OnRamp.Response>('/orders/onramp', { data }),
};
