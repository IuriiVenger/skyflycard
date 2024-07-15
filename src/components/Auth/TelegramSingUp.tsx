import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { PiTelegramLogo } from 'react-icons/pi';

type SignUpProps = {
  signUpHandler: () => void;
};

const TelegramSignUp: FC<SignUpProps> = ({ signUpHandler }) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUpHandler();
  };

  return (
    <form onSubmit={onSubmit} className="w-96">
      <p className="mb-4 text-sm text-gray-500"> We need your phone number to create an account</p>
      <p className="mb-4 text-sm text-gray-500">Please, press the button below to continue</p>
      <Button variant="bordered" color="primary" type="submit" className="mb-2 w-full" radius="sm">
        Sign Up with Telegram <PiTelegramLogo />
      </Button>
    </form>
  );
};

export default TelegramSignUp;
