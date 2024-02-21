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

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-800 p-6 text-center">
      <div className="w-96 rounded-lg bg-gray-900 p-8 shadow-md">
        <input
          name={isOtpRequested ? 'otp' : 'email'}
          placeholder={isOtpRequested ? 'Input one time password' : 'Input your email'}
          value={isOtpRequested ? otp : email}
          className="mb-4 w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          onChange={isOtpRequested ? handleOtpInput : handleEmailInput}
        />

        <button
          onClick={isOtpRequested ? signInByOtp : getOtp}
          type="button"
          className="mb-2 w-full rounded-md bg-gray-700 p-3 text-white hover:bg-blue-600 focus:outline-none"
        >
          {isOtpRequested ? 'Sign In by OTP' : 'Get OTP'}
        </button>
      </div>
    </div>
  );
};

export default LogInOtp;
