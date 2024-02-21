'use client';

import { useEffect } from 'react';

import LogInOtp from '@/components/Auth/LogInOtp';
import useAuth from '@/hooks/useAuth';

const LoginByOtpPage = () => {
  const { resetAuthState, ...authHandlers } = useAuth();

  useEffect(() => () => resetAuthState(), []);

  return <LogInOtp {...authHandlers} />;
};

export default LoginByOtpPage;
