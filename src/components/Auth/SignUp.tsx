import { Button } from '@nextui-org/react';
import { FC } from 'react';

type SignUpProps = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  signUp: () => void;
};

const SignUp: FC<SignUpProps> = (props) => {
  const { email, password, setEmail, setPassword, signUp } = props;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp();
  };

  return (
    <form onSubmit={onSubmit} className="w-96">
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
      <Button variant="bordered" color="primary" type="submit" className="mb-2 w-full" radius="sm">
        Sign up
      </Button>
    </form>
  );
};

export default SignUp;
