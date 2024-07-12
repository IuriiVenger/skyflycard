import { InitData, LaunchParams, MiniApp } from '@telegram-apps/sdk-react';

import { toast } from 'react-toastify';

import { auth } from '@/api/auth';
import { API } from '@/api/types';
import { AppEnviroment, RequestStatus, ResponseStatus } from '@/constants';
import { setAppEnviroment, setAppFullInitialized } from '@/store/slices/config';
import { setUserLoadingStatus } from '@/store/slices/user';
import { AppDispatch } from '@/store/types';
import { setTokens } from '@/utils/tokensFactory';

const useTelegramAuth = (
  dispatch: AppDispatch,
  launchParams: LaunchParams | undefined,
  initData: InitData | undefined,
  miniApp: MiniApp | undefined,
  initUser: () => Promise<void>,
  isWebAppInitialized: boolean,
  isUserLoggedIn: boolean,
) => {
  const tg_id = initData?.user?.id;
  const hash = initData?.hash;
  const init_data_raw = launchParams?.initDataRaw;
  const first_name = initData?.user?.firstName;
  const last_name = initData?.user?.lastName;

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
  };

  const telegramSignUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    console.log('telegramSignUp, pending');

    if (!tg_id || !hash || !init_data_raw || !first_name || !miniApp) {
      setLoadingStatus(RequestStatus.REJECTED);
      console.log('telegramSignUp, rejected');
      return toast.error('Invalid data');
    }

    const signUpData: API.Auth.Telegram.Signup = {
      tg_id,
      hash,
      init_data_raw,
      first_name,
      last_name,
      phone: '',
    };

    try {
      const { contact } = await miniApp.requestContact();
      signUpData.phone = contact.phoneNumber;
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      console.log('telegramSignUp, rejected');
      throw e;
    }

    try {
      const { data } = await auth.telegram.signup(signUpData);

      setTokens(data);
      await initUser();
      setLoadingStatus(RequestStatus.FULLFILLED);
      console.log('telegramSignUp, fullfilled');
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      console.log('telegramSignUp, rejected');
      throw e;
    }
  };

  const telegramSignIn = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    console.log('telegramSignIn, pending');

    if (!tg_id || !hash || !init_data_raw) {
      setLoadingStatus(RequestStatus.REJECTED);
      console.log('telegramSignIn, rejected');
      return toast.error('Invalid data');
    }

    const signInData: API.Auth.Telegram.Signin = {
      tg_id,
      hash: 'jopa',
      init_data_raw,
    };

    try {
      const { data } = await auth.telegram.signin(signInData);

      setTokens(data);
      await initUser();
      setLoadingStatus(RequestStatus.FULLFILLED);
      console.log('telegramSignIn, fullfilled');
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      console.log('telegramSignIn, rejected');
      throw e;
    }
  };

  const initTelegramAuth = async () => {
    dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));
    if (isWebAppInitialized && !isUserLoggedIn) {
      if (!tg_id || !hash || !init_data_raw || !first_name || !miniApp) {
        dispatch(setAppFullInitialized(true));
        return toast.error('Invalid data');
      }

      try {
        await telegramSignIn();
      } catch (e: any) {
        if (e.response?.status === ResponseStatus.NOT_FOUND) {
          await telegramSignUp();
          return;
        }
        throw e;
      } finally {
        dispatch(setAppFullInitialized(true));
      }
    }
  };

  return {
    telegramSignIn,
    telegramSignUp,
    initTelegramAuth,
  };
};

export default useTelegramAuth;
