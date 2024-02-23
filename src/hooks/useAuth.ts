/* eslint-disable no-restricted-globals */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { toast } from 'react-toastify';

import { RequestStatus } from '../constants';
import { setUser, setUserLoadingStatus } from '../store/slices/user';

import { wallets } from '@/api/wallets';
import { setUserWallets } from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';
import { deleteTokens, setTokens } from '@/utils/tokensFactory';

const useAuth = (dispatch: AppDispatch) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
  };

  const loadUserData = async () => {
    const [userWallets] = await Promise.all([wallets.getAll()]);
    dispatch(setUserWallets(userWallets));
  };

  const clearUserData = async () => {
    dispatch(setUser(null));
    dispatch(setUserWallets([]));
  };

  const resetAuthState = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setIsOtpRequested(false);
  };

  const getUser = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { data } = await supabase.auth.getUser();
      dispatch(setUser(data.user));
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const initUser = async () => {
    const { data } = await supabase.auth.getSession();
    const { session } = data;

    if (session) {
      setTokens(session);
      await getUser();
      await loadUserData();
    } else {
      deleteTokens();
    }
  };

  const signUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?email=${email}`,
        },
      });
      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);
        return toast.error(error.message);
      }
      data.session && setTokens(data.session);
      await loadUserData();
      dispatch(setUser(data.user));
      router.push('/');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const signIn = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);
        return toast.error(error.message);
      }
      data.session && setTokens(data.session);
      await loadUserData();
      dispatch(setUser(data.user));
      router.push('/');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const getOtp = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
        },
      });
      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);
        return toast.error(error.message);
      }
      setIsOtpRequested(true);
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const signInByOtp = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);
        return toast.error(error.message);
      }
      await loadUserData();
      data.session && setTokens(data.session);
      dispatch(setUser(data.user));
      setLoadingStatus(RequestStatus.FULLFILLED);
      router.push('/');
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const signOut = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      await supabase.auth.signOut();
      clearUserData();
      deleteTokens();
      router.push('/');
    } finally {
      setLoadingStatus(RequestStatus.NONE);
    }
  };

  return {
    signIn,
    signInByOtp,
    signUp,
    signOut,
    initUser,
    setEmail,
    setPassword,
    resetAuthState,
    email,
    password,
    otp,
    setOtp,
    getOtp,
    isOtpRequested,
  };
};

export default useAuth;
