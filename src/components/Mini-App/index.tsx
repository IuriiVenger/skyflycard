import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';
import { useEffect } from 'react';

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
  const { initUser } = useAuth(dispatch);
  const { isAppInitialized } = useAppSelector(selectFinanceData);

  useEffect(() => {
    if (!initData || !launchParams || !miniApp || !isAppInitialized) {
      return;
    }
    const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);
    initTelegramAuth();
  }, [isAppInitialized]);

  return (
    <div>
      <h1>Mini app</h1>
      <p>user: {user.userData?.id}</p>
      <p>{navigator.userAgent}</p>
    </div>
  );
};

export default MiniApp;
