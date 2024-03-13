import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import { FC } from 'react';

import logo from '@/assets/svg/header_logo.svg';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <main className="flex w-full flex-col items-center p-6 pt-20">
    <h1 className="mb-4 text-3xl font-semibold text-neutral-400">Welcome to</h1>

    <Image src={logo} width={200} height={45} alt="logo" className="mb-20" />

    {children}
  </main>
);

export default RootLayout;
