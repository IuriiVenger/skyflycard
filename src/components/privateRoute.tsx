'use client';

import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

import Loader from '@/components/Loader';
import { useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn } from '@/store/selectors';

const privateRoute = (Component: FC) => {
  const IsAuth: FC = (props) => {
    const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
    const { isAppInitialized } = useAppSelector(selectFinanceData);

    useEffect(() => {
      if (!isUserLoggedIn && isAppInitialized) {
        return redirect('/');
      }
    }, [isAppInitialized]);

    if (!isAppInitialized) {
      return <Loader />;
    }

    return <Component {...props} />;
  };

  return IsAuth;
};

export default privateRoute;
