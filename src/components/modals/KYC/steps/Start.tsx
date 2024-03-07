import { Button } from '@nextui-org/react';
import { FC, useMemo } from 'react';
import { FaRegAddressCard } from 'react-icons/fa6';

import Loader from '@/components/Loader';

type StartProps = {
  nextStep: Function;
  isPending: boolean;
  isError: boolean;
};

const Start: FC<StartProps> = ({ nextStep, isPending, isError }: StartProps) => {
  const buttonContent = useMemo(() => {
    if (isPending) {
      return <Loader size="sm" />;
    }
    if (isError) {
      return 'Error';
    }
    return 'Verify your identity';
  }, [isPending, isError]);

  return (
    <div className="mt-4 flex  flex-col items-center justify-center">
      <FaRegAddressCard className="mb-10 h-16 w-16 " />
      <h3 className="mb-5 text-center text-2xl font-medium">Proof of identity</h3>
      <p className="mb-12 w-8/12 text-center text-lg font-normal ">
        Get ready to take a photo of yourself and your ID card. After verification you will be able to buy investment
        tokens
      </p>
      <Button
        isDisabled={isError}
        className="mb-5 w-3/5 px-12"
        variant="bordered"
        color={isError ? 'danger' : 'success'}
        onClick={() => nextStep()}
      >
        {buttonContent}
      </Button>
      <small className="w-3/5 text-center text-xs">
        I give my consent to process my personal data with the policy for a period of 5 years. Other users won&apos;t
        see your photo
      </small>
    </div>
  );
};

export default Start;
