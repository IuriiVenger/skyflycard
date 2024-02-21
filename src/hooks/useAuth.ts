/* eslint-disable no-restricted-globals */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { RequestStatus } from '../constants';
import { useAppDispatch, useAppSelector } from '../store';
import { setUser, setUserInitialized, setUserLoadingStatus } from '../store/slices/user';

import { selectUserData } from '@/store/selectors';
import { deleteTokens, setTokens } from '@/utils/tokensFactory';

const useAuth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, userLoadingStatus } = useAppSelector(selectUserData);

  const isUserPending = userLoadingStatus === RequestStatus.PENDING;

  const supabase = createClientComponentClient();

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
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
    try {
      const { data } = await supabase.auth.getSession();
      const { session } = data;
      session && setTokens(session);
      await getUser();
    } finally {
      dispatch(setUserInitialized(true));
    }
  };

  const signUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback?email=${email}`,
        },
      });
      data.session && setTokens(data.session);
      dispatch(setUser(data.user));
      resetAuthState();
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
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      data.session && setTokens(data.session);
      dispatch(setUser(data.user));
      resetAuthState();
      router.push('/');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
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
      setLoadingStatus(RequestStatus.FULLFILLED);
      if (!error) {
        setIsOtpRequested(true);
      }
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
        throw error;
      }

      data.session && setTokens(data.session);
      dispatch(setUser(data.user));
      resetAuthState();
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
      dispatch(setUser(null));
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
    getUser,
    initUser,
    setEmail,
    setPassword,
    resetAuthState,
    email,
    password,
    user,
    otp,
    setOtp,
    getOtp,
    isUserPending,
    isOtpRequested,
  };
};

export default useAuth;
