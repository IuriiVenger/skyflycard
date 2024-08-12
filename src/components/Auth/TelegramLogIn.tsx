import { Button } from '@nextui-org/react';
import { FC, useMemo } from 'react';
import { PiTelegramLogo } from 'react-icons/pi';

type LogInOtpProps = {
  signInByTelegram: () => Promise<any>;
  isLoading?: boolean;
};

const TelegramLogIn: FC<LogInOtpProps> = (props) => {
  const { signInByTelegram, isLoading } = props;

  const handleSignInByTelegram = async () => {
    await signInByTelegram();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSignInByTelegram();
  };

  const buttonText = useMemo(() => {
    if (isLoading) {
      return 'Loading...';
    }
    return 'Sign in with Telegram';
  }, [isLoading]);

  return (
    <form onSubmit={onSubmit} className="h-fit w-full max-w-96">
      <Button isLoading={isLoading} type="submit" className="mb-2 w-full bg-sky-500 text-white" radius="sm">
        {buttonText} <PiTelegramLogo />
      </Button>
    </form>
  );
};

export default TelegramLogIn;
