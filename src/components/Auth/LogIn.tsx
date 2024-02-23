import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';

type LogInProps = {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  signIn: () => void;
  signUp: () => void;
};

const LogIn: FC<LogInProps> = (props) => {
  const { email, password, setEmail, setPassword, signIn, signUp } = props;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn();
  };

  return (
    <form onSubmit={onSubmit} className="flex w-96 flex-col rounded-lg  border border-b-gray-400 p-8 shadow-md">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit" color="success" className="mb-2 w-full text-white" radius="sm">
        Log in
      </Button>

      <Button variant="bordered" color="primary" onClick={signUp} className="mb-2 w-full" radius="sm">
        Sign up
      </Button>
      <Link href="/auth/login/otp" className="mb-2 w-fit self-center text-center hover:underline focus:outline-none">
        Log in by OTP
      </Link>
    </form>
  );
};

export default LogIn;
