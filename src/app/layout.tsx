import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import '@/assets/styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import { Providers } from './providers';

import type { Metadata } from 'next';

import StoreProvider from '@/store/components/StoreProvider';
import StoreWatchers from '@/store/components/StoreWatchers';

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Wallet',
  description: 'Crypto Wallet. Your Secure Oasis for Global Transactions',
};

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <StoreProvider>
    <html lang="en" className="light">
      <body className={font.className}>
        <Providers>{children}</Providers>
        <ToastContainer
          position="top-right"
          closeButton={false}
          autoClose={4000}
          transition={Slide}
          progressStyle={{ background: 'white' }}
          closeOnClick
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
