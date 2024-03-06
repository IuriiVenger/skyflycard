/* eslint-disable no-restricted-globals */

'use client';

import { useEffect } from 'react';

import LogIn from '@/components/Auth/LogIn';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { resetAuthState, ...authHandlers } = useAuth(dispatch);

  useEffect(() => () => resetAuthState(), []);

  return <LogIn {...authHandlers} />;
};
export default LoginPage;
