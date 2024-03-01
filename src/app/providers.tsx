'use client';

import { NextUIProvider } from '@nextui-org/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <NextUIProvider>
    {children}
    <Suspense>
      <AppProgressBar color="#367A53" height="5px" options={{ showSpinner: false }} shallowRouting />
    </Suspense>
  </NextUIProvider>
);
