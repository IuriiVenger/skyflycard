import { Open_Sans } from 'next/font/google';
import '@/assets/styles/globals.css';
import '@/assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FC, Suspense } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import { Providers } from './providers';

import type { Metadata } from 'next';

import Header from '@/components/Header';
import StoreProvider from '@/store/components/StoreProvider';
import StoreWatchers from '@/store/components/StoreWatchers';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VPWallet',
  description: 'VPWallet. Your Secure Oasis for Global Transactions',
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <StoreProvider>
    <html lang="en" className="light">
      <body className={font.className}>
        <Providers>
          <Header />
          <main className="flex w-full max-w-screen-2xl flex-grow justify-center px-10 pt-8">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </main>
        </Providers>
        <ToastContainer
          position="bottom-center"
          closeButton={false}
          autoClose={4000}
          transition={Slide}
          progressStyle={{ background: 'white' }}
          closeOnClick={false}
          pauseOnHover={false}
          toastClassName="py-0 px-4 bg-white border border-beerus rounded-lg shadow-xl"
          bodyClassName="text-sm text-black p-0 font-normal"
        />
        <StoreWatchers />
      </body>
    </html>
  </StoreProvider>
);

export default RootLayout;
