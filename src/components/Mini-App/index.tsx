import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import DashboardPage from '@/app/(main_layout)/dashboard/page';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn, selectUser } from '@/store/selectors';

const MiniApp = () => {
  const user = useAppSelector(selectUser);
  const { isAppInitialized } = useAppSelector(selectFinanceData);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();

  const { initUser } = useAuth(dispatch);

  useEffect(() => {
    if (launchParams && initData && miniApp && isAppInitialized && !isUserLoggedIn) {
      const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);
      initTelegramAuth();
    }
  }, [isAppInitialized]);

  return <DashboardPage />;
};

export default MiniApp;
