import { API } from './types';

import { getRequest } from '.';

export const exchange = {
  fiat2crypto: {
    getByUuid: (fiatUuid: string) =>
      getRequest<API.Exchange.Fiat2Crypto[]>(`/exchange/fiat2crypto/${fiatUuid}`).then(({ data }) => data),
  },
  crypto2crypto: {
    getByUuid: (cryptoUuid: string) => getRequest(`/exchange/crypto2crypto/${cryptoUuid}`).then(({ data }) => data),
  },
};
