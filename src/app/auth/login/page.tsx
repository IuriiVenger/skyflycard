/* eslint-disable no-restricted-globals */

'use client';

import { useEffect } from 'react';

import LogIn from '@/components/Auth/LogIn';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
  const { resetAuthState, ...authHandlers } = useAuth();

  useEffect(() => () => resetAuthState(), []);

  return <LogIn {...authHandlers} />;
};
export default LoginPage;
