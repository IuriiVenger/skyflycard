/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { API } from '@/api/types';

type CommonState = {
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  fiats: API.List.Fiat[];
  isAppInitialized: boolean;
};

const initialState: CommonState = {
  chains: [],
  crypto: [],
  fiats: [],
  isAppInitialized: false,
};

const commonSlice = createSlice({
  name: 'user',
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
    setAppInitialized: (state, action) => {
      state.isAppInitialized = action.payload;
    },
  },
});

export const { setChains, setFiats, setCrypto, setAppInitialized } = commonSlice.actions;

export default commonSlice.reducer;
