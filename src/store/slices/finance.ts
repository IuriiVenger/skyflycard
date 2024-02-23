/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { API } from '@/api/types';
import { defaultCurrency } from '@/constants';

type FinanceState = {
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  fiats: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.Fiat2Crypto[];
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  isAppInitialized: boolean;
};

const initialState: FinanceState = {
  chains: [],
  crypto: [],
  fiats: [],
  fiatExchangeRate: [],
  selectedCrypto: defaultCurrency.crypto,
  selectedFiat: defaultCurrency.fiat,
  isAppInitialized: false,
};

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
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
    },
    setSelectedFiat: (state, action) => {
      state.selectedFiat = action.payload;
    },
    setAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload;
    },
  },
});

export const {
  setChains,
  setFiats,
  setCrypto,
  setSelectedCrypto,
  setSelectedFiat,
  setAppInitialized,
  setFiatExchangeRate,
} = financeSlice.actions;

export default financeSlice.reducer;
