import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectUser } from '@/store/selectors';

const MiniApp = () => {
  const user = useAppSelector(selectUser);
  const { isAppInitialized } = useAppSelector(selectFinanceData);
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();

  const { initUser } = useAuth(dispatch);

  useEffect(() => {
    if (launchParams && initData && miniApp) {
      const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);
      initTelegramAuth();
    }
  }, [isAppInitialized]);

  return (
    <div>
      <h1>Mini app</h1>
      <p>user: {user?.userData?.id}</p>
    </div>
  );
};

export default MiniApp;
