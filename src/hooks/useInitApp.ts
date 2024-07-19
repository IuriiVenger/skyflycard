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
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const { appEnviroment } = useAppSelector(selectConfig);

  const isWebEnviroment = appEnviroment === AppEnviroment.WEB;

  const initWebApp = async () => {
    const [bins, fiats, crypto, chains, fiatExchangeRate] = await Promise.all([
      vcards.bins.getAll(),
      list.fiats.getAll(),
      list.crypto.getAll(),
      list.chains.getAll(),
      exchange.fiat2crypto.getByUuid(defaultCurrency.fiat.uuid),
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
  };

  const initApp = async () => {
    const isAuthTokensExist = localStorage.getItem('access_token');

    await initWebApp();
    isAuthTokensExist && (await initUser());

    dispatch(setWebAppInitialized(true));
    isWebEnviroment && dispatch(setAppFullInitialized(true));
  };

  return { initApp };
};

export default useInitApp;
