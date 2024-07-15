import { SDKProvider, useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { FC, PropsWithChildren, useEffect } from 'react';

import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig, selectIsUserLoggedIn } from '@/store/selectors';

const TelegramAuth: FC<PropsWithChildren> = ({ children }) => {
  const { isWebAppInitialized } = useAppSelector(selectConfig);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const { initUser } = useAuth(dispatch);

  const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);

  useEffect(() => {
    if (isWebAppInitialized && !isUserLoggedIn) {
      initTelegramAuth();
    }
  }, [isWebAppInitialized, isUserLoggedIn]);

  return <SDKProvider>{children}</SDKProvider>;
};

export default TelegramAuth;
