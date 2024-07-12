'use client';

import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

import Loader from '@/components/Loader';
import { RequestStatus } from '@/constants';
import { useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn, selectUser } from '@/store/selectors';

const privateRoute = (Component: FC) => {
  const IsAuth: FC = (props) => {
    const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
    const { userLoadingStatus } = useAppSelector(selectUser);
    const isUserLoading = userLoadingStatus === RequestStatus.PENDING;
    const { isAppInitialized } = useAppSelector(selectFinanceData);

    useEffect(() => {
      if (!isUserLoggedIn && isAppInitialized && !isUserLoading) {
        return redirect('/auth/login');
      }
    }, [isAppInitialized, isUserLoggedIn]);

    if (!isUserLoggedIn) {
      return <Loader />;
    }

    return <Component {...props} />;
  };

  return IsAuth;
};

export default privateRoute;
