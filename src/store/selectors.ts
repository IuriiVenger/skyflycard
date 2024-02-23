import { RootState } from './types';

export const selectUserData = (state: RootState) => state.user;
export const selectFinanceData = (state: RootState) => state.finance;
