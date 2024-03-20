import { getCookie } from 'cookies-next';

import useAuth from './useAuth';

import { exchange } from '@/api/exchange';

import { list } from '@/api/list';
import { defaultCurrency } from '@/constants';
import {
  setAppInitialized,
  setChains,
  setCrypto,
  setFiatExchangeRate,
  setFiats,
  setSelectedCrypto,
} from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const initApp = async () => {
    try {
      const isAuthTokensExist = getCookie('access_token');
      const [fiats, crypto, chains, fiatExchangeRate] = await Promise.all([
        list.fiats.getAll(),
        list.crypto.getAll(),
        list.chains.getAll(),
        exchange.fiat2crypto.getByUuid(defaultCurrency.fiat.uuid),
        isAuthTokensExist && initUser(),
      ]);

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
    }
  };

  return { initApp };
};

export default useInitApp;
