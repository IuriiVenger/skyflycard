import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';

import wpwallet from '@/assets/img/vpwallet.webp';

type WalletOverviewProps = {
  isUserLoggedIn: boolean;
};

const WalletOverview: FC<WalletOverviewProps> = ({ isUserLoggedIn }) => (
  <section className="flex w-full max-w-screen-xl items-center justify-center gap-5 p-4 max-md:flex-col max-md:gap-0">
    <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col max-md:max-w-full">
        <h2 className="text-6xl font-bold leading-[72px] tracking-tighter text-black max-md:max-w-full max-md:text-4xl max-md:leading-[59px]">
          Your Secure Oasis for Global Transactions
        </h2>
        <p className="mt-4 text-lg leading-7 text-tenant-main max-md:max-w-full">
          Take Control of Your Coins in One Touch: <span className="font-bold text-tenant-main">VPWallet</span>
        </p>

        <Button
          as={Link}
          href={isUserLoggedIn ? '/dashboard' : '/auth/login'}
          color="success"
          className="mt-8 justify-center self-start whitespace-nowrap rounded px-6 py-3 text-center text-sm font-semibold leading-6 text-white max-md:px-5"
        >
          {isUserLoggedIn ? 'Open dashboard' : 'Create account'}
        </Button>
      </div>
    </div>
    <div className="ml-5 flex w-full flex-col xs:w-7/12 max-md:ml-0 md:w-4/12">
      <img
        alt="Secure Oasis for Global Transactions"
        src={wpwallet.src}
        className=" w-full grow rounded-3xl max-md:mt-10 max-md:max-w-full"
      />
    </div>
  </section>
);

export default WalletOverview;
