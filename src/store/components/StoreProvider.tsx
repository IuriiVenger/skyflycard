'use client';

import { useLaunchParams } from '@telegram-apps/sdk-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Provider } from 'react-redux';

import useInitApp from '@/hooks/useInitApp';
import { store } from '@/store';

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const { dispatch } = store;
  const { initApp } = useInitApp(dispatch);
  const launchParams = useLaunchParams(true);

  const currentSeconds = Math.floor(Date.now() / 1000);

  useEffect(() => {
    initApp();
    console.log(launchParams?.initDataRaw, currentSeconds, 'launchParams?.initDataRaw');
  }, []);

  useEffect(() => {
    console.log(launchParams?.initDataRaw, currentSeconds, 'launchParams?.initDataRaw');
  }, [launchParams]);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
