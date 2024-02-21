import Link from 'next/link';

import { FC } from 'react';

import AuthButtons from './AuthButtons';

const Header: FC = () => (
  <header className="fixed left-0 top-0 z-50 flex h-[88px] w-full items-center justify-between bg-white px-4 py-6 transition-all">
    <Link href="/">Main</Link>
    <AuthButtons />
  </header>
);

export default Header;
