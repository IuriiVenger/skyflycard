import { useLaunchParams, useMiniApp, useInitData } from '@telegram-apps/sdk-react';

import TelegramSignUp from '@/components/Auth/TelegramSingUp';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch } from '@/store';

const TelegramAuthSignupPage = () => {
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const { initUser } = useAuth(dispatch);

  const { telegramSignUp } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);

  return <TelegramSignUp signUpHandler={telegramSignUp} />;
};

export default TelegramAuthSignupPage;
