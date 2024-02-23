import { API } from './types';

import { getRequest, postRequest } from '.';

export const wallets = {
  create: () => postRequest('/wallets'),
  getAll: () => getRequest<API.Wallets.Wallet[]>('/wallets').then(({ data }) => data),
  getByUuid: (uuid: string) => getRequest<API.Wallets.Wallet>(`/wallets/${uuid}`).then(({ data }) => data),
  getAddress: (chain: string, wallet_uuid: string) =>
    getRequest(`/wallets/address/${chain}`, { params: { wallet_uuid } }).then(({ data }) => data),
  createAddress: (chain: string, wallet_uuid: string) =>
    postRequest('/wallets/address', { data: { chain, wallet_uuid } }).then(({ data }) => data),
};
