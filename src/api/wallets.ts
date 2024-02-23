import { getRequest, postRequest } from '.';

export const wallets = {
  create: () => postRequest('/wallets'),
  getAll: () => getRequest('/wallets'),
  getByUuid: (uuid: string) => getRequest(`/wallets/${uuid}`),
  getAddress: (chain: string, wallet_uuid: string) =>
    getRequest(`/wallets/address/${chain}`, { params: { wallet_uuid } }),
  createAddress: (chain: string, wallet_uuid: string) =>
    postRequest('/wallets/address', { data: { chain, wallet_uuid } }),
};
