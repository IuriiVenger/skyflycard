import { API } from './types';

import { getRequest } from '.';

import { defaultPaginationParams } from '@/constants';

export const transactions = {
  getByWalletUuid: async (
    walletUuid: string,
    limit = defaultPaginationParams.limit,
    offset = defaultPaginationParams.offset,
  ) => getRequest<API.WalletTransactions.Transaction[]>(`/transactions/${walletUuid}`, { params: { limit, offset } }),
};
