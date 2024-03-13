/* eslint-disable no-restricted-globals */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { auth } from '@/api/auth';
import { wallets } from '@/api/wallets';
import { RequestStatus } from '@/constants';
import { setSelectedWallet, setUserWallets } from '@/store/slices/finance';
import { setUser, setUserData, setUserLoadingStatus } from '@/store/slices/user';
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

  const loadWallets = async () => {
    const userWallets = await wallets.getAll();
    dispatch(setUserWallets(userWallets));
    if (userWallets.length) {
      const activeWalletUuid = userWallets[0].uuid;
      const activeWallet = await wallets.getByUuid(activeWalletUuid);
      dispatch(setSelectedWallet(activeWallet));
    }
  };

  const unloadWallets = () => {
    dispatch(setUserWallets([]));
    dispatch(setSelectedWallet(null));
  };

  const loadUserData = async () => {
    try {
      dispatch(setUserLoadingStatus(RequestStatus.PENDING));
      const { data } = await auth.user_data();
      dispatch(setUserData(data));
      dispatch(setUserLoadingStatus(RequestStatus.FULLFILLED));
    } catch (e) {
      dispatch(setUserLoadingStatus(RequestStatus.REJECTED));
      throw e;
    }
  };

  const loadUserContent = async () => {
    await Promise.all([loadUserData(), loadWallets()]);
  };

  const clearUserContent = async () => {
    dispatch(setUser(null));
    dispatch(setUserData(null));
    unloadWallets();
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
      await loadUserContent();
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
      await loadUserContent();
      dispatch(setUser(data.user));
      router.push('/dashboard');
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
      await loadUserContent();
      dispatch(setUser(data.user));
      router.push('/dashboard');
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
          emailRedirectTo: `${location.origin}/auth/callback?email=${email}`,
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
      const { data, error }: any = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email',
      });
      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);
        return toast.error(error.message);
      }
      if (data.session) {
        setTokens(data.session);
      }

      if (data.access_token) {
        const tokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
        setTokens(tokens);
      }

      dispatch(setUser(data.user));
      await loadUserContent();
      router.push('/dashboard');
      toast.success('You have successfully logged in');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }
  };

  const signOut = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      await supabase.auth.signOut();
      clearUserContent();
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
    loadUserData,
  };
};

export default useAuth;
