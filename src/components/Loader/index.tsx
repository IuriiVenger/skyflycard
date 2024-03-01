import { Spinner } from '@nextui-org/react';
import cx from 'classnames';
import { FC } from 'react';

type LoaderProps = {
  className?: string;
};

const Loader: FC<LoaderProps> = ({ className }) => (
  <Spinner className={cx(className, 'items-centerh-full flex w-full justify-center')} color="success" />
);

export default Loader;
