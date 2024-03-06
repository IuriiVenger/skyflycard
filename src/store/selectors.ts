import { RootState } from './types';

import { RequestStatus } from '@/constants';

export const selectUserData = (state: RootState) => state.user;
export const selectIsUserLoggedIn = (state: RootState) => state.user.userLoadingStatus === RequestStatus.FULLFILLED;
export const selectFinanceData = (state: RootState) => state.finance;

export const selectActiveFiatAvailableCrypto = (state: RootState) => {
  const { fiatExchangeRate, crypto } = state.finance;

  const availableToExchangeCryptoUuid = fiatExchangeRate.map((item) => item.crypto_uuid);

  const availableCrypto = crypto.filter((item) => availableToExchangeCryptoUuid.includes(item.uuid));

  return availableCrypto;
};
