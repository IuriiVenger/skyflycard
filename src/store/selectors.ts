import { RootState } from './types';

export const selectUserData = (state: RootState) => state.user;
export const selectCommonData = (state: RootState) => state.common;
