import { RootState } from './types';

import { RequestStatus } from '@/constants';

export const selectUserData = (state: RootState) => state.user;
export const selectIsUserLoggedIn = (state: RootState) => state.user.userLoadingStatus === RequestStatus.FULLFILLED;
export const selectFinanceData = (state: RootState) => state.finance;
