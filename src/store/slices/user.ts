/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { User } from '@supabase/supabase-js';

import { RequestStatus } from '@/constants';

type InitialState = {
  user: null | User;
  userLoadingStatus: RequestStatus;
};

const initialState: InitialState = {
  user: null,
  userLoadingStatus: RequestStatus.NONE,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userLoadingStatus = RequestStatus.FULLFILLED;
      state.user = action.payload;
    },
    setUserLoadingStatus: (state, action) => {
      state.userLoadingStatus = action.payload;
    },
  },
});

export const { setUser, setUserLoadingStatus } = userSlice.actions;

export default userSlice.reducer;
