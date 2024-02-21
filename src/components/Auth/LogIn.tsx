import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { FC } from 'react';

type LogInProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  signIn: () => void;
};

const LogIn: FC<LogInProps> = (props) => {
  const { email, password, setEmail, setPassword, signIn } = props;

  return (
    <form onSubmit={signIn} className="w-96 rounded-lg bg-gray-900 p-8 shadow-md">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        className="mb-4 w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        className="mb-4 w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={signIn}
        className="mb-2 w-full rounded-md bg-gray-700 p-3 text-white hover:bg-blue-600 focus:outline-none"
      >
        Log in
      </button>
      <Link href="/auth/login/otp" className="mb-2 w-full self-center text-white hover:underline focus:outline-none">
        Log in by OTP
      </Link>
    </form>
  );
};

export default LogIn;
