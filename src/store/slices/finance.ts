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
import { wallets } from '@/api/wallets';
import {
  CalcType,
  RequestStatus,
  defaultCurrency,
  defaultPaginationParams,
  emptyStoreDataWithStatus,
} from '@/constants';

type FinanceState = {
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  fiats: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.Fiat2Crypto[];
  onrampCalc: StoreDataWithStatus<StoreOnrampCalcData[] | null>;
  offrampCalc: StoreDataWithStatus<StoreOfframpCalcData[] | null>;
  withdrawCalc: StoreDataWithStatus<API.Orders.Crypto.Withdrawal.Calc.Response | null>;
  selectedChain: API.List.Chains;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  selectedWallet: API.Wallets.ExtendWallet | null;
  selectedWalletTransactions: StoreDataWithStatusAndMeta<API.Transactions.Transaction[] | null> &
    SupabasePaginationParams;
  userWallets: API.Wallets.Wallet[];
  isAppInitialized: boolean;
};

const initialState: FinanceState = {
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
  selectedWallet: null,
  selectedWalletTransactions: {
    ...emptyStoreDataWithStatus,
    meta: defaultPaginationParams,
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
      state.selectedWalletTransactions.data = state.selectedWalletTransactions.data
        ? [...state.selectedWalletTransactions.data, ...action.payload]
        : action.payload;
      state.selectedWalletTransactions.meta.offset += action.payload.length;
      if (action.payload.length < state.selectedWalletTransactions.meta.limit) {
        state.selectedWalletTransactions.meta.isLastPage = true;
      }
    });
    builder.addCase(loadMoreTransactions.rejected, (state) => {
      state.selectedWalletTransactions.status = RequestStatus.REJECTED;
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
