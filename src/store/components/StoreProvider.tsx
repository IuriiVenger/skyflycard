'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

import useInitApp from '@/hooks/useInitApp';
import { store } from '@/store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = store;
  const { initApp } = useInitApp();
  useEffect(() => {
    initApp(dispatch);
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
