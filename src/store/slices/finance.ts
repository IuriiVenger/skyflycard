/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  StoreDataWithStatus,
  StoreDataWithStatusAndMeta,
  StoreOfframpCalcData,
  StoreOnrampCalcData,
  SupabasePaginationParams,
} from '../types';

import { orders } from '@/api/orders';
import { transactions } from '@/api/transactions';
import { API } from '@/api/types';
import { vcards } from '@/api/vcards';
import { wallets } from '@/api/wallets';
import {
  CalcType,
  RequestStatus,
  cardInitialPaginationParams,
  defaultCurrency,
  defaultPaginationParams,
  emptyStoreDataWithStatus,
} from '@/constants';

type FinanceState = {
  bins: API.Cards.Bin[];
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  fiats: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.F2C[];
  onrampCalc: StoreDataWithStatus<StoreOnrampCalcData[] | null>;
  offrampCalc: StoreDataWithStatus<StoreOfframpCalcData[] | null>;
  withdrawCalc: StoreDataWithStatus<API.Orders.Crypto.Withdrawal.Calc.Response | null>;
  selectedChain: API.List.Chains;
  selectedCrypto: API.List.Crypto;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedFiat: API.List.Fiat;
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null> &
    SupabasePaginationParams;
  selectedCardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null> & SupabasePaginationParams;
  selectedWalletCards: StoreDataWithStatusAndMeta<API.Cards.CardDetailItem[] | null> & SupabasePaginationParams;
  userWallets: API.Wallets.Wallet[];
};

const initialState: FinanceState = {
  bins: [],
  chains: [],
  crypto: [],
  fiats: [],
  fiatExchangeRate: [],
  onrampCalc: emptyStoreDataWithStatus,
  offrampCalc: emptyStoreDataWithStatus,
  withdrawCalc: emptyStoreDataWithStatus,
  selectedChain: defaultCurrency.chain,
  selectedCrypto: defaultCurrency.crypto,
  selectedFiat: defaultCurrency.fiat,
  selectedWallet: emptyStoreDataWithStatus,
  selectedCard: emptyStoreDataWithStatus,
  selectedCardTransactions: {
    ...emptyStoreDataWithStatus,
    meta: defaultPaginationParams,
  },
  selectedWalletTransactions: {
    ...emptyStoreDataWithStatus,
    meta: defaultPaginationParams,
  },
  selectedWalletCards: {
    ...emptyStoreDataWithStatus,
    meta: cardInitialPaginationParams,
  },
  userWallets: [],
};

type LoadWithLimit<T> = T & {
  limit?: number;
  offset?: number;
};

type RequiredLoadWithLimit<T> = T & {
  limit: number;
  offset: number;
};

export const loadSelectedWallet = createAsyncThunk('finanse/selectedWallet', async (wallet_uuid: string) => {
  const data = await wallets.getByUuid(wallet_uuid);

  return data;
});

export const loadSelectedCard = createAsyncThunk('finanse/selectedCard', async (card_id: string) => {
  if (!card_id) {
    return null;
  }
  const { data } = await vcards.cards.getById(card_id);

  return data;
});

export const loadWalletTransactions = createAsyncThunk(
  'finanse/walletTransactions',
  async ({ wallet_uuid, limit, offset }: LoadWithLimit<{ wallet_uuid: string }>) => {
    const requestData = {
      wallet_uuid,
      limit: limit || initialState.selectedWalletTransactions.meta.limit,
      offset: offset || initialState.selectedWalletTransactions.meta.offset,
    };

    const { data } = await transactions.getByWalletUuid(requestData.wallet_uuid, requestData.limit, requestData.offset);

    return data;
  },
);

export const loadMoreWalletTransactions = createAsyncThunk(
  'finanse/moreTransactions',
  async (props: LoadWithLimit<{ wallet_uuid: string }> & SupabasePaginationParams['meta']) => {
    const { wallet_uuid, limit, offset } = props;
    const { data } = await transactions.getByWalletUuid(wallet_uuid, limit, offset);

    return data;
  },
);

export const loadCardTransactions = createAsyncThunk(
  'finanse/cardTransactions',
  async ({ card_id, limit, offset }: LoadWithLimit<{ card_id: string }>) => {
    const { data } = await vcards.transactions.getByCardId(card_id, limit, offset);

    return data;
  },
);

export const loadMoreCardTransactions = createAsyncThunk(
  'finanse/moreCardTransactions',
  async (props: LoadWithLimit<{ card_id: string }> & SupabasePaginationParams['meta']) => {
    const { card_id, limit, offset } = props;
    const { data } = await vcards.transactions.getByCardId(card_id, limit, offset);

    return data;
  },
);

export const loadCards = createAsyncThunk(
  'finanse/cards',
  async ({ wallet_uuid, limit, offset }: RequiredLoadWithLimit<{ wallet_uuid: string }>) => {
    const { data } = await vcards.cards.getAll(wallet_uuid, limit, offset);

    return data;
  },
);

export const loadMoreCards = createAsyncThunk(
  'finanse/moreCards',
  async (props: RequiredLoadWithLimit<{ wallet_uuid: string }> & SupabasePaginationParams['meta']) => {
    const { wallet_uuid, limit, offset } = props;
    const { data } = await vcards.cards.getAll(wallet_uuid, limit, offset);

    return data;
  },
);

export const loadOnrampCalc = createAsyncThunk(
  'finanse/onrampCalc',
  async (requestData: API.Orders.OnRamp.Calc.Request) => {
    const { data } = await orders.onramp.calc(requestData);

    return data.map((calcData) => ({ ...calcData, type: CalcType.ONRAMP }));
  },
);

export const loadOfframpCalc = createAsyncThunk(
  'finanse/offrampCalc',
  async (requestData: API.Orders.OffRamp.Calc.Request) => {
    const { data } = await orders.offramp.calc(requestData);

    return data.map((calcData) => ({ ...calcData, type: CalcType.OFFRAMP }));
  },
);

export const loadWithdrawCalc = createAsyncThunk(
  'finanse/withdrawCalc',
  async (requestData: API.Orders.Crypto.Withdrawal.Calc.Request) => {
    const { data } = await orders.crypto.withdrawal.calc(requestData);

    return data;
  },
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setBins: (state, action) => {
      state.bins = action.payload;
    },
    setChains: (state, action) => {
      state.chains = action.payload;
    },
    setCrypto: (state, action) => {
      state.crypto = action.payload;
    },
    setFiats: (state, action) => {
      state.fiats = action.payload;
    },
    setFiatExchangeRate: (state, action) => {
      state.fiatExchangeRate = action.payload;
    },
    setSelectedChain: (state, action) => {
      state.selectedChain = action.payload;
    },
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setSelectedFiat: (state, action) => {
      state.selectedFiat = action.payload;
    },
    setSelectedWallet: (state, action) => {
      state.selectedWallet.data = action.payload;
    },

    setUserWallets: (state, action) => {
      state.userWallets = action.payload;
    },
    clearSelectedCard: (state) => {
      state.selectedCard = emptyStoreDataWithStatus;
      state.selectedCardTransactions = {
        ...emptyStoreDataWithStatus,
        meta: defaultPaginationParams,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSelectedWallet.pending, (state) => {
      state.selectedWallet.status = RequestStatus.PENDING;
    });
    builder.addCase(loadSelectedWallet.fulfilled, (state, action) => {
      state.selectedWallet.data = action.payload;
      state.selectedWallet.status = RequestStatus.FULLFILLED;
    });
    builder.addCase(loadSelectedWallet.rejected, (state) => {
      state.selectedWallet.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadSelectedCard.pending, (state) => {
      state.selectedCard.status = RequestStatus.PENDING;
    });
    builder.addCase(loadSelectedCard.fulfilled, (state, action) => {
      state.selectedCard.status = RequestStatus.FULLFILLED;
      state.selectedCard.data = action.payload;
    });
    builder.addCase(loadSelectedCard.rejected, (state) => {
      state.selectedCard.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadWalletTransactions.pending, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadWalletTransactions.fulfilled, (state, action) => {
      state.selectedWalletTransactions.status = RequestStatus.FULLFILLED;
      state.selectedWalletTransactions.data = action.payload;
      state.selectedWalletTransactions.meta.offset = state.selectedWalletTransactions.data.length;
      state.selectedWalletTransactions.meta.isLastPage =
        action.payload.length < state.selectedWalletTransactions.meta.limit;
    });
    builder.addCase(loadWalletTransactions.rejected, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.REJECTED;
      state.selectedWalletTransactions.data = [];
    });
    builder.addCase(loadMoreWalletTransactions.pending, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadMoreWalletTransactions.fulfilled, (state, action) => {
      state.selectedWalletTransactions.status = RequestStatus.FULLFILLED;
      state.selectedWalletTransactions.data = state.selectedWalletTransactions.data
        ? [...state.selectedWalletTransactions.data, ...action.payload]
        : action.payload;
      state.selectedWalletTransactions.meta.offset += action.payload.length;
      if (action.payload.length < state.selectedWalletTransactions.meta.limit) {
        state.selectedWalletTransactions.meta.isLastPage = true;
      }
    });
    builder.addCase(loadMoreWalletTransactions.rejected, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadCardTransactions.pending, (state) => {
      state.selectedCardTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadCardTransactions.fulfilled, (state, action) => {
      state.selectedCardTransactions.status = RequestStatus.FULLFILLED;
      state.selectedCardTransactions.data = action.payload.items;
      state.selectedCardTransactions.meta.offset = state.selectedCardTransactions.data.length;
      state.selectedCardTransactions.meta.isLastPage =
        action.payload.items.length < state.selectedCardTransactions.meta.limit;
    });
    builder.addCase(loadCardTransactions.rejected, (state) => {
      state.selectedCardTransactions.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadMoreCardTransactions.pending, (state) => {
      state.selectedCardTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadMoreCardTransactions.fulfilled, (state, action) => {
      state.selectedCardTransactions.status = RequestStatus.FULLFILLED;
      state.selectedCardTransactions.data = state.selectedCardTransactions.data
        ? [...state.selectedCardTransactions.data, ...action.payload.items]
        : action.payload.items;
      state.selectedCardTransactions.meta.offset += action.payload.items.length;
      if (action.payload.items.length < state.selectedCardTransactions.meta.limit) {
        state.selectedCardTransactions.meta.isLastPage = true;
      }
    });
    builder.addCase(loadMoreCardTransactions.rejected, (state) => {
      state.selectedCardTransactions.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadCards.pending, (state) => {
      state.selectedWalletCards.status = RequestStatus.PENDING;
    });
    builder.addCase(loadCards.fulfilled, (state, action) => {
      state.selectedWalletCards.status = RequestStatus.FULLFILLED;
      state.selectedWalletCards.data = action.payload.items;
      state.selectedWalletCards.meta.offset = action.payload.items.length;
      state.selectedWalletCards.meta.isLastPage = action.payload.items.length < state.selectedWalletCards.meta.limit;
    });
    builder.addCase(loadCards.rejected, (state) => {
      state.selectedWalletCards.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadMoreCards.pending, (state) => {
      state.selectedWalletCards.status = RequestStatus.PENDING;
    });
    builder.addCase(loadMoreCards.fulfilled, (state, action) => {
      state.selectedWalletCards.status = RequestStatus.FULLFILLED;
      state.selectedWalletCards.data = state.selectedWalletCards.data
        ? [...state.selectedWalletCards.data, ...action.payload.items]
        : action.payload.items;
      state.selectedWalletCards.meta.offset += action.payload.items.length;
      if (action.payload.items.length < state.selectedWalletCards.meta.limit) {
        state.selectedWalletCards.meta.isLastPage = true;
      }
    });
    builder.addCase(loadMoreCards.rejected, (state) => {
      state.selectedWalletCards.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadOnrampCalc.pending, (state) => {
      state.onrampCalc.status = RequestStatus.PENDING;
    });
    builder.addCase(loadOnrampCalc.fulfilled, (state, action) => {
      state.onrampCalc.status = RequestStatus.FULLFILLED;
      state.onrampCalc.data = action.payload;
    });
    builder.addCase(loadOnrampCalc.rejected, (state) => {
      state.onrampCalc.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadOfframpCalc.pending, (state) => {
      state.offrampCalc.status = RequestStatus.PENDING;
    });
    builder.addCase(loadOfframpCalc.fulfilled, (state, action) => {
      state.offrampCalc.status = RequestStatus.FULLFILLED;
      state.offrampCalc.data = action.payload;
    });
    builder.addCase(loadOfframpCalc.rejected, (state) => {
      state.offrampCalc.status = RequestStatus.REJECTED;
    });
    builder.addCase(loadWithdrawCalc.pending, (state) => {
      state.withdrawCalc.status = RequestStatus.PENDING;
    });
    builder.addCase(loadWithdrawCalc.fulfilled, (state, action) => {
      state.withdrawCalc.status = RequestStatus.FULLFILLED;
      state.withdrawCalc.data = action.payload;
    });
    builder.addCase(loadWithdrawCalc.rejected, (state) => {
      state.withdrawCalc.status = RequestStatus.REJECTED;
    });
  },
});

export const {
  setBins,
  setChains,
  setFiats,
  setCrypto,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,

  setFiatExchangeRate,
  setUserWallets,
  setSelectedWallet,
  clearSelectedCard,
} = financeSlice.actions;

export default financeSlice.reducer;
