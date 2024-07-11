import { mockTelegramEnv } from '@telegram-apps/sdk';
import { useInitData, useInitDataRaw, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import { getCookie, setCookie } from 'cookies-next';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectUser } from '@/store/selectors';

const MiniApp = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const initData = useInitData(true);
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const { loadUserContent } = useAuth(dispatch);
  const { isAppInitialized } = useAppSelector(selectFinanceData);

  useEffect(() => {
    if (!initData || !launchParams || !miniApp || !isAppInitialized) {
      return;
    }
    const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, loadUserContent);
    initTelegramAuth();
  }, [isAppInitialized]);

  return (
    <div>
      <h1>Mini app</h1>
      <p>{user.userData?.id}</p>
    </div>
  );
};

export default MiniApp;
