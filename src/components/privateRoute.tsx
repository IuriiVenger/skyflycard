'use client';

import { redirect } from 'next/navigation';
import { FC, useEffect } from 'react';

import Loader from '@/components/Loader';
import { AppEnviroment, RequestStatus } from '@/constants';
import { useAppSelector } from '@/store';
import { selectConfig, selectIsUserLoggedIn, selectUser } from '@/store/selectors';

const privateRoute = (Component: FC) => {
  const IsAuth: FC = (props) => {
    const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
    const { userLoadingStatus } = useAppSelector(selectUser);
    const isUserLoading = userLoadingStatus === RequestStatus.PENDING;
    const { isAppFullInitialized, appEnviroment } = useAppSelector(selectConfig);

    useEffect(() => {
      if (!isUserLoggedIn && isAppFullInitialized && !isUserLoading) {
        if (appEnviroment === AppEnviroment.WEB) {
          return redirect('/auth/login');
        }
      }
    }, [isAppFullInitialized, isUserLoggedIn]);

    if (!isAppFullInitialized) {
      return <Loader />;
    }

    if (isUserLoading) {
      return <Component {...props} />;
    }

    return 'Something went wrong';
  };

  return IsAuth;
};

export default privateRoute;
