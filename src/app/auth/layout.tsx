import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <div className="flex min-h-screen w-full items-center justify-center ">{children}</div>
);

export default RootLayout;
