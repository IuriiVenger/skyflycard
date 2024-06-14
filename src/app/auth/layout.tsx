import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import Link from 'next/link';
import { FC } from 'react';

import logo from '@/assets/svg/header_logo.svg';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <main className="flex flex-grow pt-10 sm:items-center sm:pt-0">
    <div className="flex flex-col items-center rounded-lg border-b-gray-400  p-6 sm:border sm:shadow-md">
      <Link href="/">
        <Image src={logo} height={32} alt="logo" />
      </Link>
      <h1 className="my-6 text-2.5xl font-medium ">Authorization</h1>
      {children}
    </div>
  </main>
);

export default RootLayout;
