import { API } from './types';

import { getRequest } from '.';

export const vcards = {
  cards: {
    getAll: (wallet_uuid: string) => getRequest<API.Cards.CardsList>('/vcards/cards', { params: { wallet_uuid } }),
    getById: (card_id: string) => getRequest<API.Cards.CardDetailItem>(`/vcards/cards/${card_id}`),
    getSensitiveData: (card_id: string) => getRequest<API.Cards.SensitiveData>(`/vcards/cards/${card_id}/sensitive`),
  },
  transactions: {
    getByCardId: (card_id: string) => getRequest<API.Cards.CardTransactionItem[]>(`/vcards/transactions/${card_id}`),
  },
};
