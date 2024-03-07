import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

type KYCButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

const KYCButton: FC<KYCButtonProps> = ({ onClick, disabled, className }) => (
  <Button
    onClick={onClick}
    isDisabled={disabled}
    color="success"
    variant="bordered"
    className={cn(className, 'w-full rounded-lg  text-xs font-bold')}
  >
    Verify your account
  </Button>
);

export default KYCButton;
