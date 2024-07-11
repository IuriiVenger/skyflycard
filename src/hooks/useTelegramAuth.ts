import { InitData, LaunchParams, MiniApp, useInitData, useLaunchParams, useMiniApp } from '@telegram-apps/sdk-react';

import { toast } from 'react-toastify';

import useAuth from './useAuth';

import { auth } from '@/api/auth';
import { API } from '@/api/types';
import { RequestStatus } from '@/constants';
import { setUser, setUserLoadingStatus } from '@/store/slices/user';
import { AppDispatch } from '@/store/types';
import { setTokens } from '@/utils/tokensFactory';

const useTelegramAuth = (
  dispatch: AppDispatch,
  launchParams: LaunchParams,
  initData: InitData,
  miniApp: MiniApp,
  initUser: () => Promise<void>,
) => {
  const tg_id = initData.user?.id;
  const { hash } = initData;
  const init_data_raw = launchParams.initDataRaw;
  const first_name = initData.user?.firstName;
  const last_name = initData.user?.lastName;

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
  };

  const telegramSignUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    if (!tg_id || !hash || !init_data_raw || !first_name || !miniApp) {
      setLoadingStatus(RequestStatus.REJECTED);
      return toast.error('Invalid data');
    }

    const { contact } = await miniApp.requestContact();

    const signUpData: API.Auth.Telegram.Signup = {
      tg_id,
      hash,
      init_data_raw,
      first_name,
      last_name,
      phone: contact.phoneNumber,
    };

    try {
      const { data } = await auth.telegram.signup(signUpData);

      setTokens(data);
      await initUser();
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const telegramSignIn = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    if (!tg_id || !hash || !init_data_raw) {
      setLoadingStatus(RequestStatus.REJECTED);
      return toast.error('Invalid data');
    }

    const signInData: API.Auth.Telegram.Signin = {
      tg_id,
      hash,
      init_data_raw,
    };

    try {
      const { data } = await auth.telegram.signin(signInData);

      setTokens(data);

      await initUser();
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const initTelegramAuth = async () => {
    try {
      await telegramSignIn();
    } catch (e) {
      try {
        await telegramSignUp();
      } catch (err) {
        toast.error('Auth error');
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
