import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import config from './slices/config';
import finance from './slices/finance';
import ui from './slices/ui';
import user from './slices/user';

import { AppDispatch, RootState } from './types';

export const store = configureStore({
  reducer: {
    config,
    user,
    finance,
    ui,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppStore = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
