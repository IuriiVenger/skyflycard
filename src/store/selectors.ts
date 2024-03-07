import { RootState } from './types';

import { RequestStatus } from '@/constants';
import { getActiveFiatAvailableCrypto } from '@/utils/financial';

export const selectUser = (state: RootState) => state.user;
export const selectIsUserLoggedIn = (state: RootState) => state.user.userLoadingStatus === RequestStatus.FULLFILLED;
export const selectFinanceData = (state: RootState) => state.finance;
export const selectModalVisibility = (state: RootState) => state.ui.popupVisibility;

export const selectActiveFiatAvailableCrypto = (state: RootState) => {
  const { fiatExchangeRate, crypto } = state.finance;

  const availableCrypto = getActiveFiatAvailableCrypto(fiatExchangeRate, crypto);

  return availableCrypto;
};
