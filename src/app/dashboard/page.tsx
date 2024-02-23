'use client';

import { Button } from '@nextui-org/react';

import { API } from '@/api/types';
import { wallets } from '@/api/wallets';
import CryptoForm from '@/components/CryptoForm';
import Loader from '@/components/Loader';
import Wallet from '@/components/Wallet';
import useOrder from '@/hooks/useOrder';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat, setUserWallets } from '@/store/slices/finance';

const DashboardPage = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, isAppInitialized, userWallets } =
    useAppSelector(selectFinanceData);
  const { createOrder } = useOrder();

  const dispatch = useAppDispatch();

  const setCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));

  const createWallet = async () => {
    await wallets.create();
    const newUserWallets = await wallets.getAll();
    dispatch(setUserWallets(newUserWallets));
  };

  if (!isAppInitialized) {
    return <Loader />;
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {userWallets.length ? (
        <>
          <div className="flex w-full flex-col items-center gap-4">
            {userWallets.map((wallet) => (
              <Wallet key={wallet.uuid} wallet={wallet} />
            ))}
          </div>
          <CryptoForm
            activeWallet={userWallets[0]}
            createFiatOrder={createOrder}
            className="max-w-sm"
            selectCrypto={setCrypto}
            selectFiat={setFiat}
            selectedCrypto={selectedCrypto}
            selectedFiat={selectedFiat}
            cryptoList={crypto}
            fiatList={fiats}
            fiatExchangeRate={fiatExchangeRate}
          />
        </>
      ) : (
        <Button onClick={createWallet}>Create Wallet</Button>
      )}
    </div>
  );
};

export default DashboardPage;
