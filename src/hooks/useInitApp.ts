import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import { getCookie } from 'cookies-next';

import useAuth from './useAuth';

import useTelegramAuth from './useTelegramAuth';

import { exchange } from '@/api/exchange';

import { list } from '@/api/list';
import { vcards } from '@/api/vcards';
import { defaultCurrency } from '@/constants';
import {
  setAppInitialized,
  setBins,
  setChains,
  setCrypto,
  setFiatExchangeRate,
  setFiats,
  setSelectedCrypto,
} from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);

  const initApp = async () => {
    try {
      const isAuthTokensExist = getCookie('access_token');
      const [bins, fiats, crypto, chains, fiatExchangeRate] = await Promise.all([
        vcards.bins.getAll(),
        list.fiats.getAll(),
        list.crypto.getAll(),
        list.chains.getAll(),
        exchange.fiat2crypto.getByUuid(defaultCurrency.fiat.uuid),
        isAuthTokensExist && initUser(),
      ]);
      dispatch(setBins(bins));
      dispatch(setFiats(fiats));
      dispatch(setCrypto(crypto));
      dispatch(setChains(chains));
      dispatch(setFiatExchangeRate(fiatExchangeRate));

      const fiatExchangeRateCryptoUuid = fiatExchangeRate.map((item) => item.crypto_uuid);
      const availableCrypto = crypto.filter((item) => fiatExchangeRateCryptoUuid.includes(item.uuid));

      if (!availableCrypto.find((crypto_item) => crypto_item.uuid === defaultCurrency.crypto.uuid)) {
        dispatch(setSelectedCrypto(availableCrypto[0]));
      }
    } finally {
      dispatch(setAppInitialized(true));
      if (launchParams && initData && miniApp) {
        const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);
        initTelegramAuth();
        initTelegramAuth();
      }
    }
  };

  return { initApp };
};

export default useInitApp;
