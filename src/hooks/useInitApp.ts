import { getCookie } from 'cookies-next';

import { useSelector } from 'react-redux';

import useAuth from './useAuth';

import { exchange } from '@/api/exchange';

import { list } from '@/api/list';
import { vcards } from '@/api/vcards';
import { AppEnviroment, defaultCurrency } from '@/constants';

import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';
import { setAppFullInitialized, setWebAppInitialized } from '@/store/slices/config';
import {
  setBins,
  setChains,
  setCrypto,
  setFiatExchangeRate,
  setFiats,
  setSelectedCrypto,
} from '@/store/slices/finance';
import { AppDispatch, RootState } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const { appEnviroment } = useAppSelector(selectConfig);
  const isWebEnviroment = appEnviroment === AppEnviroment.WEB;

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
      dispatch(setWebAppInitialized(true));
      isWebEnviroment && dispatch(setAppFullInitialized(true));
    }
  };

  return { initApp };
};

export default useInitApp;
