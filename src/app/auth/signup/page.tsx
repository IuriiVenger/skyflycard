'use client';

import { useEffect } from 'react';

import SignUp from '@/components/Auth/SignUp';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
  const { resetAuthState, ...authHandlers } = useAuth();

  useEffect(() => () => resetAuthState(), []);

  return <SignUp {...authHandlers} />;
};
export default LoginPage;
