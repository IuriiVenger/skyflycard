import { FC } from 'react';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';

type WalletBalanceListProps = {
  wallet: API.Wallets.Wallet | null;
  cryptoList: API.List.Crypto[];
};

const WalletBalanceList: FC<WalletBalanceListProps> = (props) => {
  const { wallet, cryptoList } = props;
  const cryptoListWithBalance = cryptoList.map((crypto) => {
    const balance = wallet?.balance.find((walletBalance) => walletBalance.crypto.uuid === crypto.uuid);
    return { ...crypto, balance: balance?.amount || 0 };
  });

  return (
    <section className="flex flex-col">
      <h3 className="mb-4 text-xl font-bold">Wallet crypto balance</h3>
      <div className="flex flex-col gap-2">
        {cryptoListWithBalance.map((crypto) => (
          <section key={crypto.uuid} className="flex items-center justify-between">
            <CurrencyInfo hideShevron key={crypto.uuid} currency={crypto} />
            <p className="font-medium text-gray-500">{crypto.balance}</p>
          </section>
        ))}
      </div>
    </section>
  );
};

export default WalletBalanceList;
