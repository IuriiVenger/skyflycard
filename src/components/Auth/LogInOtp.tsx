import { Button } from '@nextui-org/react';
import { ChangeEvent, FC } from 'react';

type LogInOtpProps = {
  otp: string;
  email: string;
  setEmail: (email: string) => void;
  getOtp: () => void;
  setOtp: (otp: string) => void;
  signInByOtp: () => void;
  isOtpRequested: boolean;
};

const LogInOtp: FC<LogInOtpProps> = (props) => {
  const { otp, email, setOtp, signInByOtp, setEmail, isOtpRequested, getOtp } = props;

  const handleOtpInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isOtpRequested ? signInByOtp() : getOtp();
  };

  return (
    <form onSubmit={onSubmit} className="w-96 rounded-lg border border-b-gray-400  p-8 shadow-md">
      <input
        name={isOtpRequested ? 'otp' : 'email'}
        placeholder={isOtpRequested ? 'Input one time password' : 'Input your email'}
        value={isOtpRequested ? otp : email}
        className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        onChange={isOtpRequested ? handleOtpInput : handleEmailInput}
      />

      <Button
        type="submit"
        color="success"
        onClick={isOtpRequested ? signInByOtp : getOtp}
        className="mb-2 w-full text-white"
        radius="sm"
      >
        {isOtpRequested ? 'Sign In by OTP' : 'Get OTP'}
      </Button>
    </form>
  );
};

export default LogInOtp;
