import { mockTelegramEnv } from '@telegram-apps/sdk';
import { useInitData, useInitDataRaw, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import { getCookie, setCookie } from 'cookies-next';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const MiniApp = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const initData = useInitData(true);
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const { loadUserContent } = useAuth(dispatch);

  useEffect(() => {
    if (!initData || !launchParams || !miniApp) {
      return;
    }
    const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, loadUserContent);
    initTelegramAuth();
  }, [launchParams, initData, miniApp]);

  return (
    <div>
      <h1>Mini app</h1>
      <p>{user.userData?.id}</p>
    </div>
  );
};

export default MiniApp;
