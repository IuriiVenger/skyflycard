/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { User } from '@supabase/supabase-js';

import { RequestStatus } from '@/constants';

import useAuth from '@/hooks/useAuth';

type InitialState = {
  user: null | User;
  isUserInitialized: boolean;
  userLoadingStatus: RequestStatus;
};

const initialState: InitialState = {
  user: null,
  isUserInitialized: false,
  userLoadingStatus: RequestStatus.NONE,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      const { signOut } = useAuth();
      signOut();
      state.user = null;
      state.userLoadingStatus = RequestStatus.NONE;
    },
    setUser: (state, action) => {
      state.userLoadingStatus = RequestStatus.FULLFILLED;
      state.user = action.payload;
    },
    setUserInitialized: (state, action) => {
      state.isUserInitialized = action.payload;
    },
    setUserLoadingStatus: (state, action) => {
      state.userLoadingStatus = action.payload;
    },
  },
});

export const { logout, setUser, setUserLoadingStatus, setUserInitialized } = userSlice.actions;

export default userSlice.reducer;
