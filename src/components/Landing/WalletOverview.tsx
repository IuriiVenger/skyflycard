import { Button } from '@nextui-org/react';
import { FC } from 'react';

import wpwallet from '@/assets/img/vpwallet.webp';

const WalletOverview: FC = () => (
  <section className="flex w-full max-w-screen-xl gap-5 px-4 max-md:flex-col max-md:gap-0">
    <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col max-md:max-w-full">
        <h2 className="text-6xl font-bold leading-[72px] tracking-tighter text-black max-md:max-w-full max-md:text-4xl max-md:leading-[59px]">
          Your Secure Oasisfor Global Transactions
        </h2>
        <p className="mt-4 text-lg leading-7 text-tenant-main max-md:max-w-full">
          Take Control of Your Coinsin One Touch: <span className="font-bold text-tenant-main">VPWallet</span>
        </p>
        <Button
          color="success"
          className="mt-8 justify-center self-start whitespace-nowrap rounded px-6 py-3 text-center text-sm font-semibold leading-6 text-white max-md:px-5"
        >
          Create account
        </Button>
      </div>
    </div>
    <div className="ml-5 flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
      <img
        alt="Secure Oasis for Global Transactions"
        src={wpwallet.src}
        className=" w-full grow rounded-3xl max-md:mt-10 max-md:max-w-full"
      />
    </div>
  </section>
);

export default WalletOverview;
