import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { PiTelegramLogo } from 'react-icons/pi';
import { toast } from 'react-toastify';

import { useRequestStatus } from '@/hooks/useRequestStatus';

type SignUpProps = {
  signUpHandler: () => Promise<void>;
};

const TelegramSignUp: FC<SignUpProps> = ({ signUpHandler }) => {
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setPending();
      await signUpHandler();
      setFullfilled();
      toast.success('You have successfully signed up');
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  return (
    <form onSubmit={onSubmit} className=" w-80">
      <p className="mb-2 text-center text-xs text-gray-500"> We need your phone number to create an account</p>
      <p className="mb-6 text-center text-xs text-gray-500">Please, press the button below to continue</p>
      <Button
        color="primary"
        type="submit"
        className="mb-2 w-full"
        radius="sm"
        isLoading={requestStatuses.PENDING}
        isDisabled={requestStatuses.FULLFILLED}
      >
        Sign Up with Telegram <PiTelegramLogo />
      </Button>
    </form>
  );
};

export default TelegramSignUp;
