import { API } from './types';

import { getRequest, patchRequest } from '.';

import { defaultPaginationParams } from '@/constants';

export const vcards = {
  cards: {
    getAll: (wallet_uuid: string) => getRequest<API.Cards.CardsList>('/vcards/cards', { params: { wallet_uuid } }),
    getById: (card_id: string) => getRequest<API.Cards.CardDetailItem>(`/vcards/cards/${card_id}`),
    getSensitiveData: (card_id: string) => getRequest<API.Cards.SensitiveData>(`/vcards/cards/${card_id}/sensitive`),
    update: (card_id: string, data: API.Cards.Request) =>
      patchRequest<API.Cards.CardDetailItem>(`/vcards/cards/${card_id}`, { data }),
  },
  transactions: {
    getByCardId: (card_id: string, limit = defaultPaginationParams.limit, offset = defaultPaginationParams.offset) =>
      getRequest<API.Cards.TransactionsList>(`/vcards/transactions/${card_id}`, { params: { limit, offset } }),
  },
  bins: {
    getAll: () => getRequest<API.Cards.Bin[]>('/vcards/bins'),
  },
};
