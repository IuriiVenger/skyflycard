'use client';

import { useEffect } from 'react';

import LogInOtp from '@/components/Auth/LogInOtp';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';

const LoginByOtpPage = () => {
  const dispatch = useAppDispatch();
  const { resetAuthState, ...authHandlers } = useAuth(dispatch);

  useEffect(() => () => resetAuthState(), []);

  return <LogInOtp {...authHandlers} />;
};

export default LoginByOtpPage;
