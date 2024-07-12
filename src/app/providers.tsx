'use client';

import { NextUIProvider } from '@nextui-org/react';

import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

import { tenantMainColor } from '../../tailwind.config';

import ModalsContainer from './(main_layout)/_components/ModalContainer';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider className="flex min-h-screen flex-col items-center text-neutral-950">
    {children}
    <Suspense>
      <AppProgressBar color={tenantMainColor} height="5px" options={{ showSpinner: false }} shallowRouting />
    </Suspense>
    <ModalsContainer />
  </NextUIProvider>
);
