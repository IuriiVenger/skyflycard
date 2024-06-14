import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { HiOutlineIdentification } from 'react-icons/hi';
import { PiWarning } from 'react-icons/pi';

import { KYCStatuses, retryKYCStatuses } from '@/constants';

type KYCButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  status: KYCStatuses;
};

const KYCButton: FC<KYCButtonProps> = ({ onClick, disabled, className, status }) => {
  const isReverifyStatus = retryKYCStatuses.includes(status);

  const buttonText = isReverifyStatus ? 'Retry KYC verification' : 'Verify your identity';
  const buttonIcon = isReverifyStatus ? (
    <PiWarning className="h-6 w-6" />
  ) : (
    <HiOutlineIdentification className="ml-2 h-6 w-6" />
  );
  return (
    <Button
      onClick={onClick}
      isDisabled={disabled}
      color="primary"
      radius="sm"
      variant="bordered"
      className={cn(className, 'w-full pl-2 pr-4 text-xs font-medium')}
    >
      {buttonIcon} {buttonText}
    </Button>
  );
};

export default KYCButton;
