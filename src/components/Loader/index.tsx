import { Spinner } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

type LoaderProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const Loader: FC<LoaderProps> = ({ className, size }) => (
  <Spinner size={size} className={cn(className, 'items-centerh-full flex w-full justify-center')} color="success" />
);

export default Loader;
