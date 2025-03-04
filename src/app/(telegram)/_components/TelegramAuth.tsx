import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import { AppEnviroment } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig, selectIsUserLoggedIn } from '@/store/selectors';
import { setAppEnviroment } from '@/store/slices/config';

const TelegramAuth = () => {
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

  useEffect(() => {
    dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));

    localStorage.setItem('app_enviroment', AppEnviroment.TELEGRAM);
  }, []);

  return null;
};

export default TelegramAuth;
