import 'react-toastify/dist/ReactToastify.css';
import { FC } from 'react';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <div className="flex  w-full justify-center ">{children}</div>
);

export default RootLayout;
