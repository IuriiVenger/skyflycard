import { Spinner } from '@nextui-org/react';
import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import logo from '@/assets/svg/header_logo.svg';

type LoaderProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const Loader: FC<LoaderProps> = ({ className, size }) => (
  <Spinner size={size} className={cn(className, 'flex w-full justify-center')} color="primary" />
);

export const BrandLoader: FC = () => (
  <div className="flex w-full flex-col items-center justify-center">
    <Image src={logo} height={32} alt="logo" className="absolute mb-6 animate-pulse" />
  </div>
);

export default Loader;
