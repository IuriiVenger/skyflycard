import { API } from './types';

import { getRequest } from '.';

export const exchange = {
  fiat2crypto: {
    getByUuid: (fiatUuid: string) =>
      getRequest<API.Exchange.F2C[]>(`/exchange/f2c/${fiatUuid}`).then(({ data }) => data),
  },
  crypto2crypto: {
    getByUuid: (cryptoUuid: string) => getRequest(`/exchange/c2c/${cryptoUuid}`).then(({ data }) => data),
  },
};
