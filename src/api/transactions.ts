import { API } from './types';

import { getRequest } from '.';

export const transactions = {
  getByWalletUuid: async (walletUuid: string, limit = 50, offset = 0) =>
    getRequest<API.Transactions.Transaction[]>(`/transactions/${walletUuid}`, { params: { limit, offset } }),
};
