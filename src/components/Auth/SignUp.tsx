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

  return (
    <main className="flex h-screen items-center justify-center bg-gray-800 p-6">
      <div className="w-96 rounded-lg bg-gray-900 p-8 shadow-md">
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
          onClick={signUp}
          type="button"
          className="mb-2 w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 focus:outline-none"
        >
          Sign Up
        </button>
      </div>
    </main>
  );
};

export default SignUp;
