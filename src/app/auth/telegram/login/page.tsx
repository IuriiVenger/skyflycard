'use client';

import { useLaunchParams, useMiniApp, useInitData, SDKProvider } from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import TelegramLogIn from '@/components/Auth/TelegramLogIn';
import { RequestStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const TelegramAuthSignupPage = () => {
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const { userLoadingStatus } = useAppSelector(selectUser);
  const { initUser } = useAuth(dispatch);
  const isUserLoading = userLoadingStatus === RequestStatus.PENDING;

  const { initTelegramAuth, telegramSignIn } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);

  console.log('TelegramAuthSigninPage');
  console.log('miniApp', miniApp);
  console.log('initData', initData);
  console.log('launchParams', launchParams);

  const tg_id = initData?.user?.id;
  const hash = initData?.hash;
  const init_data_raw = launchParams?.initDataRaw;

  console.log('tg_id', tg_id);
  console.log('hash', hash);
  console.log('init_data_raw', init_data_raw);

  useEffect(() => {
    if (tg_id && hash && init_data_raw) {
      initTelegramAuth();
    }
  }, [hash]);

  return (
    <SDKProvider>
      <TelegramLogIn signInByTelegram={telegramSignIn} isLoading={isUserLoading} />
    </SDKProvider>
  );
};

export default TelegramAuthSignupPage;
