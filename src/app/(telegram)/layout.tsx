'use client';

import 'react-toastify/dist/ReactToastify.css';
import { SDKProvider } from '@telegram-apps/sdk-react';
import { setCookie } from 'cookies-next';
import { FC, Suspense } from 'react';

import TelegramAuth from './_components/TelegramAuth';

import { AppEnviroment } from '@/constants';
import { useAppDispatch } from '@/store';
import { setAppEnviroment } from '@/store/slices/config';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const MainLayout: FC<RootLayoutProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));

  setCookie('app_enviroment', AppEnviroment.TELEGRAM);

  return (
    <main className="flex w-full max-w-screen-2xl flex-grow justify-center p-5 pb-20 md:px-10 md:pt-8">
      <SDKProvider>
        <TelegramAuth />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </SDKProvider>
    </main>
  );
};

export default MainLayout;
