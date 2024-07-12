'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

import useInitApp from '@/hooks/useInitApp';
import { store } from '@/store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = store;
  const { initApp } = useInitApp(dispatch);

  useEffect(() => {
    initApp();
    console.log(navigator.userAgent, 'navigator.userAgent');
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
