'use client';

import { NextUIProvider } from '@nextui-org/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

import ModalsContainer from './_components/ModalContainer';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider className="flex min-h-screen flex-col items-center">
    {children}
    <Suspense>
      <AppProgressBar color="#367A53" height="5px" options={{ showSpinner: false }} shallowRouting />
    </Suspense>
    <ModalsContainer />
  </NextUIProvider>
);
