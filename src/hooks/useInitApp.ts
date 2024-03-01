import useAuth from './useAuth';

import { exchange } from '@/api/exchange';

import { list } from '@/api/list';
import { defaultCurrency } from '@/constants';
import { setAppInitialized, setChains, setCrypto, setFiatExchangeRate, setFiats } from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const initApp = async () => {
    const [fiats, crypto, chains, fiatExchangeRate] = await Promise.all([
      list.fiats.getAll(),
      list.crypto.getAll(),
      list.chains.getAll(),
      exchange.fiat2crypto.getByUuid(defaultCurrency.fiat.uuid),
      initUser(),
    ]);

    dispatch(setFiats(fiats));
    dispatch(setCrypto(crypto));
    dispatch(setChains(chains));
    dispatch(setFiatExchangeRate(fiatExchangeRate));
    dispatch(setAppInitialized(true));
  };

  return { initApp };
};

export default useInitApp;
