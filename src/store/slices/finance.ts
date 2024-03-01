/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { StoreDataWithStatusAndMeta, SupabasePaginationParams } from '../types';

import { transactions } from '@/api/transactions';
import { API } from '@/api/types';
import { wallets } from '@/api/wallets';
import { RequestStatus, defaultCurrency } from '@/constants';

type FinanceState = {
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  fiats: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.Fiat2Crypto[];
  selectedChain: API.List.Chains;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  selectedWallet: API.Wallets.ExtendWallet | null;
  selectedWalletTransactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[]> & SupabasePaginationParams;
  userWallets: API.Wallets.Wallet[];
  isAppInitialized: boolean;
};

const initialState: FinanceState = {
  chains: [],
  crypto: [],
  fiats: [],
  fiatExchangeRate: [],
  selectedChain: defaultCurrency.chain,
  selectedCrypto: defaultCurrency.crypto,
  selectedFiat: defaultCurrency.fiat,
  selectedWallet: null,
  selectedWalletTransactions: {
    meta: {
      limit: 20,
      offset: 0,
      isLastPage: false,
    },
    status: RequestStatus.NONE,
    data: [],
  },
  userWallets: [],
  isAppInitialized: false,
};

type LoadTransactionsPayload = {
  wallet_uuid: string;
  limit?: number;
  offset?: number;
};

export const loadSelectedWallet = createAsyncThunk('finanse/selectedWallet', async (wallet_uuid: string) => {
  const data = await wallets.getByUuid(wallet_uuid);

  return data;
});

export const loadTransactions = createAsyncThunk(
  'finanse/transactions',
  async ({ wallet_uuid, limit, offset }: LoadTransactionsPayload) => {
    const requestData = {
      wallet_uuid,
      limit: limit || initialState.selectedWalletTransactions.meta.limit,
      offset: offset || initialState.selectedWalletTransactions.meta.offset,
    };

    const { data } = await transactions.getByWalletUuid(requestData.wallet_uuid, requestData.limit, requestData.offset);

    return data;
  },
);

export const loadMoreTransactions = createAsyncThunk(
  'finanse/moreTransactions',
  async ({ wallet_uuid, limit, offset }: LoadTransactionsPayload & SupabasePaginationParams['meta']) => {
    const { data } = await transactions.getByWalletUuid(wallet_uuid, limit, offset);

    return data;
  },
);

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
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
      state.selectedWallet = action.payload;
    },
    setAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload;
    },
    setUserWallets: (state, action) => {
      state.userWallets = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSelectedWallet.fulfilled, (state, action) => {
      state.selectedWallet = action.payload;
    });
    builder.addCase(loadTransactions.pending, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadTransactions.fulfilled, (state, action) => {
      state.selectedWalletTransactions.status = RequestStatus.FULLFILLED;
      state.selectedWalletTransactions.data = action.payload;
      state.selectedWalletTransactions.meta.offset = state.selectedWalletTransactions.data.length;
      state.selectedWalletTransactions.meta.isLastPage =
        action.payload.length < state.selectedWalletTransactions.meta.limit;
    });
    builder.addCase(loadTransactions.rejected, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.REJECTED;
      state.selectedWalletTransactions.data = [];
    });
    builder.addCase(loadMoreTransactions.pending, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.PENDING;
    });
    builder.addCase(loadMoreTransactions.fulfilled, (state, action) => {
      state.selectedWalletTransactions.status = RequestStatus.FULLFILLED;
      state.selectedWalletTransactions.data = [...state.selectedWalletTransactions.data, ...action.payload];
      state.selectedWalletTransactions.meta.offset += action.payload.length;
      if (action.payload.length < state.selectedWalletTransactions.meta.limit) {
        state.selectedWalletTransactions.meta.isLastPage = true;
      }
    });
    builder.addCase(loadMoreTransactions.rejected, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.REJECTED;
    });
  },
});

export const {
  setChains,
  setFiats,
  setCrypto,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,
  setAppInitialized,
  setFiatExchangeRate,
  setUserWallets,
  setSelectedWallet,
} = financeSlice.actions;

export default financeSlice.reducer;
