import useAuth from './useAuth';

import { list } from '@/api/list';
import { setAppInitialized, setChains, setCrypto, setFiats } from '@/store/slices/common';
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const initApp = async () => {
    initUser();

    const [fiats, crypto, chains] = await Promise.all([
      list.fiats.getAll(),
      list.crypto.getAll(),
      list.chains.getAll(),
    ]);
    dispatch(setFiats(fiats));
    dispatch(setCrypto(crypto));
    dispatch(setChains(chains));
    dispatch(setAppInitialized(true));
  };

  return { initApp };
};

export default useInitApp;
