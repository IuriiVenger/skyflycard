import { useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import DashboardPage from '@/app/(main_layout)/dashboard/page';
import { RequestStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn } from '@/store/selectors';
import { setUserLoadingStatus } from '@/store/slices/user';

const MiniApp = () => {
  const { isAppInitialized } = useAppSelector(selectFinanceData);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const { initUser } = useAuth(dispatch);

  const { initTelegramAuth } = useTelegramAuth(
    dispatch,
    launchParams,
    initData,
    miniApp,
    initUser,
    isAppInitialized,
    isUserLoggedIn,
  );

  useEffect(() => {
    initTelegramAuth();
  }, [isAppInitialized]);

  return <DashboardPage />;
};

export default MiniApp;
